import type { IPost } from "@/types";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (post: IPost) => axiosInstance.post("/posts", post),
  });
};
