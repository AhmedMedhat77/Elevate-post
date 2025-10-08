import type { IPost } from "@/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
interface IGetPostsParams {
  page: number;
  limit: number;
  id?: number;
  search?: string;
}

export const useGetPosts = ({ page = 1, limit = 10, id, search }: IGetPostsParams) => {
  return useQuery({
    queryKey: ["posts", page, limit, id, search],
    queryFn: async () => {
      const params: Record<string, string | number> = { _page: page, _limit: limit };
      if (id) params.userId = id;
      if (search) params.q = search;
      
      const res = await axiosInstance.get<IPost[]>("/posts", { params });
      const total = Number(res.headers["x-total-count"] ?? 0);
      return { data: res.data, total };
    },
  });
};
