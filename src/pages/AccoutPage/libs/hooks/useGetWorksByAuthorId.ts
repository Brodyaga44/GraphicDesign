import { useEffect, useState } from "react";

import type { IAuthorWork } from "../../model/types/IAuthorWork";

import { $api } from "@/shared/config/api/api";

export const useGetWorksByAuthorId = (authorId?: string) => {
  const [works, setWorks] = useState<IAuthorWork["works"]>([]);

  useEffect(() => {
    if (!authorId) return;

    $api
      .get(`/public/work/user?id=${authorId}`)
      .then((res) => setWorks(res.data.works));
  }, [authorId]);

  return { works };
};
