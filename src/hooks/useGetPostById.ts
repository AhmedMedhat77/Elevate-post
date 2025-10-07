import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface IUseGetPostById {
  body: string;
  id: number;
  title: string;
  userId: number;
}
export const useGetPostById = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => axiosInstance.get<IUseGetPostById>(`/posts/${id}`),
  });
};
