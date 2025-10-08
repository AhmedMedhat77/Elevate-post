import type { IPost } from "@/types";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (post: CreatePostData) => axiosInstance.post<IPost>("/posts", post),
  });
};
