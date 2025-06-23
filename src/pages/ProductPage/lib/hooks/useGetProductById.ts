import { useEffect, useState } from "react";

import { $api } from "@/shared/config/api/api";
import type { IWork } from "@/shared/config/interfaces/IWork";

export const useGetProductById = (productId?: string) => {
  const [product, setProduct] = useState<IWork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    $api
      .get(`/public/work/search?id=${productId}`)
      .then((res) =>
        res.data.message ? setProduct(null) : setProduct(res.data),
      )
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading };
};
