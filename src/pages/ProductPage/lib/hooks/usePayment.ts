import { notification } from "antd";

import type { IProductDetails } from "../../interfaces/IProductDetails";

declare const cp: any;

export const usePayment = () => {
  const handlePayment = (product?: IProductDetails) => {
    if (!product) {
      alert("Некорректные данные товара");
      return;
    }
    const widget = new cp.CloudPayments();

    widget.pay(
      "charge", // 'auth' или 'charge' — для списания сразу используем 'charge'
      {
        publicId: "test_api_00000000000000000000001", // тут замени на свой publicId из личного кабинета CloudPayments
        description: `Оплата товара: ${product.title}`,
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
          notification.success({
            message: "Спасибо за покупку!",
            description: `Ваш заказ ${product.title} успешно оплачен.`,
            placement: "topRight",
          });
        },
        onFail: () => {
          alert("Отмена заказа");
        },
      },
    );
  };

  return { handlePayment };
};
