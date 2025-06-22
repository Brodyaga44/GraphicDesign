import { useEffect, useState } from "react";

import type { IWork } from "@/pages/ProductPage/interfaces/IWork";
import { $api } from "@/shared/config/api/api";

export const useGetWorks = () => {
  const [works, setWorks] = useState<IWork[]>([]);

  useEffect(() => {
    $api.get("/public/work/all").then((res) => setWorks(res.data));
  }, []);

  return { works };
};
