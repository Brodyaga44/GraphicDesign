import { useEffect, useState } from "react";

import { $api } from "@/shared/config/api/api";
import type { IWork } from "@/shared/config/interfaces/IWork";

export const useGetOrders = () => {
  const [orders, setOrders] = useState<IWork[]>([]);

  useEffect(() => {
    $api
      .get("/cart/owned")
      .then((res) =>
        !("message" in res.data) ? setOrders(res.data) : setOrders([]),
      );
  }, []);

  return { orders };
};
