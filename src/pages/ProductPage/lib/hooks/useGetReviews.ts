import { useEffect, useState } from "react";

import type { IWorkReview } from "../../model/types/IWorkReviews";

import { $api } from "@/shared/config/api/api";

export const useGetReviews = (workId?: string | number) => {
  const [reviews, setReviews] = useState<IWorkReview[]>([]);

  useEffect(() => {
    if (!workId) return;

    $api
      .get(`/public/report/search?workId=${workId}`)
      .then((res) => setReviews(res.data));
  }, []);

  return { reviews };
};
