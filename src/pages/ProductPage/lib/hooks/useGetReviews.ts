import { useEffect, useState } from "react";

import type { IWorkReview } from "../../model/types/IWorkReviews";

import { $api } from "@/shared/config/api/api";

export const useGetReviews = (workId: number) => {
  const [reviews, setReviews] = useState<IWorkReview[]>([]);

  useEffect(() => {
    $api
      .get(`/report/getCart?workId=${workId}`)
      .then((res) => setReviews(res.data));
  }, []);

  return { reviews };
};
