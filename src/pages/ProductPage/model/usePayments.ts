import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";

import { specApiInstance } from "../../../1_shared/api/apiInstance";
import { env } from "../../../env";

import { productsMock } from "@/widgets/CategoryProducts/model/productsMock.ts";

interface IPromocodeInput {
  code: string;
}

interface IPromoCodeOutput {
  discount: number;
  code: string;
}

interface IPaymentHookOutput {
  payment: (productId: number, promoCode?: string) => Promise<void>;
  onPromoCodeFind: (promo: IPromocodeInput) => Promise<void>;
  promoCode?: IPromoCodeOutput;
  errorPromo: string | null;
  isPromoLoading: boolean;
  setPromoCode: React.Dispatch<
    React.SetStateAction<IPromoCodeOutput | undefined>
  >;
}

const usePayment = (): IPaymentHookOutput => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState<IPromoCodeOutput | undefined>();
  const [errorPromo, setErrorPromo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPromoCodeFind = async (promo: IPromocodeInput) => {
    try {
      setIsLoading(true);
      const req = await specApiInstance.get("ls/promocodes/v1/find", {
        params: promo,
      });
      setPromoCode(req.data);
      setErrorPromo(null);
      setIsLoading(false);
    } catch (e) {
      setErrorPromo(
        (e as AxiosError<any>).response?.data?.message || "Ошибка промокода",
      );
      setPromoCode(undefined);
      setIsLoading(false);
    }
  };

  const { trigger: makeOrderTrigger } = useSWRMutation(
    "ss/order/v2/make-order",
    async ({
      productId,
      discount,
    }: {
      productId: number;
      discount: number;
    }) => {
      // Пример фейкового запроса создания заказа
      // Замени на свой реальный запрос
      return {
        invoiceId: `order_${Date.now()}`,
        discountedPrice:
          (productsMock.find((p) => p.id === productId)?.price || 0) - discount,
      };
    },
  );

  const payment = async (productId: number, promoCodeInput?: string) => {
    const product = productsMock.find((p) => p.id === productId);
    if (!product) {
      alert("Товар не найден");
      return;
    }

    const discount = promoCode?.discount || 0;
    const order = await makeOrderTrigger({ productId, discount });

    if (!window.cp) {
      alert("Платежная система временно недоступна");
      return;
    }

    const paymentWidget = new window.cp.CloudPayments({
      googlePaySupport: true,
      yandexPaySupport: true,
      tinkoffInstallmentSupport: true,
    });

    paymentWidget.pay(
      "charge",
      {
        publicId: String(env.REACT_APP_CLOUD_PAY),
        description: `Оплата товара: ${product.title}`,
        invoiceId: order.invoiceId,
        amount: order.discountedPrice,
        currency: "RUB",
        email: "user@example.com", // Здесь подставь реальный email пользователя
        accountId: "user@example.com", // Или id пользователя
        skin: "mini",
        data: {
          cloudPayments: {
            customerReceipt: {
              items: [
                {
                  label: product.title,
                  price: order.discountedPrice,
                  quantity: 1,
                  amount: order.discountedPrice,
                  vat: "0",
                },
              ],
              taxationSystem: 2,
              phone: "+71234567890", // подставь телефон, если есть
              email: "user@example.com",
            },
          },
        },
      },
      {
        onSuccess() {
          alert("Платеж прошёл успешно");
          navigate("/success"); // куда угодно, твой роут после оплаты
        },
        onFail(reason) {
          alert("Ошибка оплаты: " + reason);
          navigate("/fail"); // куда угодно, роут ошибки
        },
      },
    );
  };

  return {
    payment,
    onPromoCodeFind,
    promoCode,
    errorPromo,
    isPromoLoading: isLoading,
    setPromoCode,
  };
};

export default usePayment;
