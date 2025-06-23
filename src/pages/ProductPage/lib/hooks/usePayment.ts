import { notification } from "antd";

import type { IProductDetails } from "../../interfaces/IProductDetails";

import { $api } from "@/shared/config/api/api";
import type { IWork } from "@/shared/config/interfaces/IWork";

declare const cp: any;

export const usePayment = () => {
  const handlePayment = (product?: IWork) => {
    console.log(product);
    if (!product) {
      alert("Некорректные данные товара");
      return;
    }
    const widget = new cp.CloudPayments();

    widget.pay(
      "charge", // 'auth' или 'charge' — для списания сразу используем 'charge'
      {
        publicId: "test_api_00000000000000000000001", // тут замени на свой publicId из личного кабинета CloudPayments
        description: `Оплата товара: ${product.titleName}`,
        amount: product.price,
        currency: "RUB",
        invoiceId: `order_${Date.now()}`, // уникальный номер заказа
        skin: "mini",
        autoClose: 3, // автозакрытие виджета после успешной оплаты через 3 секунды
        payer: {
          phone: "+71234567890",
          firstName: "Иван",
          lastName: "Иванов",
        },
      },
      {
        onSuccess: () => {
          $api
            .post("/cart/add", { workId: product.id })
            .then((res) => res.data.id)
            .then((_) => {
              $api.post(`/cart/success?id=${product.id}`).then((_) => {
                notification.success({
                  message: "Спасибо за покупку!",
                  description: `Ваш заказ ${product.titleName} успешно оплачен.`,
                  placement: "topRight",
                });
              });
            })
            .catch((_) =>
              notification.error({
                message:
                  "Произошла ошибка при оплате товара на стороне нашего сервиса",
                placement: "topRight",
              }),
            );
        },
        onFail: () => {
          notification.error({
            message: "Оплата отменена",
            placement: "topRight",
          });
        },
      },
    );
  };

  return { handlePayment };
};
