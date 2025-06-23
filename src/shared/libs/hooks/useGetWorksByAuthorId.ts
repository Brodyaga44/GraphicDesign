import { useEffect, useState } from "react";

import { $api } from "@/shared/config/api/api";
import type { IAuthorWork } from "@/shared/config/interfaces/IAuthorWork";
import type { IWork } from "@/shared/config/interfaces/IWork";

export const useGetWorksByAuthorId = (authorId?: string) => {
  const [works, setWorks] = useState<IWork[]>([]);

  useEffect(() => {
    if (!authorId) return;

    $api
      .get(`/public/work/user?id=${authorId}`)
      .then((res) => setWorks(res.data.works));
  }, [authorId]);

  return { works };
};
