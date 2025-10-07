import type { IPost } from "@/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
interface IGetPostsParams {
  page: number;
  limit: number;
  id?: number;
}

export const useGetPosts = ({ page = 1, limit = 10, id }: IGetPostsParams) => {
  return useQuery({
    queryKey: ["posts", page, limit, id],
    queryFn: async () => {
      const res = await axiosInstance.get<IPost[]>("/posts", {
        params: { _page: page, _limit: limit, userId: id },
      });
      const total = Number(res.headers["x-total-count"] ?? 0);
      return { data: res.data, total };
    },
  });
};
