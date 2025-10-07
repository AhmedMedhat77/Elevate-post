import type { IUser } from "@/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => axiosInstance.get<IUser[]>("/users"),
  });
};
