import { useEffect, useState } from "react";

import type { IAuthor } from "../../config/interfaces/IAuthor";

import { $api } from "@/shared/config/api/api";

export const useGetAuthorById = (authorId?: string) => {
  const [author, setAuthor] = useState<IAuthor | null>(null);

  useEffect(() => {
    if (!authorId) return;

    $api
      .get(`/public/user/search?id=${authorId}`)
      .then((res) => setAuthor(res.data));
  }, [authorId]);

  return { author };
};
