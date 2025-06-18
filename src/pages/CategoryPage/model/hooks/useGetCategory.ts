import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { ICategoryData } from "@/pages/CategoryPage/ui/interfaces/ICategoryItems.ts";
import { $api } from "@/shared/config/api/api.ts";

export const useGetCategory = (category: string) => {
  const [currCategoryItems, setCurrCategoryItems] = useState<ICategoryData[]>(
    [],
  );
  const getCategory = async () => {
    const res: AxiosResponse<ICategoryData[]> = await $api.get(
      `/public/work/category?search=${category}`,
    );
    setCurrCategoryItems(res?.data);
  };
  useEffect(() => {
    getCategory();
  }, [category]);
  return { currCategoryItems, getCategory, setCurrCategoryItems };
};
