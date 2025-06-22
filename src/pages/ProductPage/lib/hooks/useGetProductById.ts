import { useState } from "react";

import { $api } from "@/shared/config/api/api";

export const useGetProductById = (productId?: string) => {
  const [product, setProduct] = useState();
  $api
    .get(productId ? `/public/work/search?id=${productId}` : "")
    .then((res) => console.log(res));
  return { product };
};
