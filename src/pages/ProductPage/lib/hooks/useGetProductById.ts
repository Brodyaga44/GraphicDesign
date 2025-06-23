import { useEffect, useState } from "react";

import { $api } from "@/shared/config/api/api";
import type { IWork } from "@/shared/config/interfaces/IWork";

export const useGetProductById = (productId?: string) => {
  const [product, setProduct] = useState<IWork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    $api
      .get(productId ? `/public/work/search?id=${productId}` : "")
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { product, loading };
};
