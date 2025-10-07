import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IPost, IUser } from "@/types";

interface PostsStore {
  selectedPost: (IPost & { user: IUser }) | null;
  setSelectedPost: (post: (IPost & { user: IUser }) | null) => void;
}

export const usePostsStore = create<PostsStore>()(
  persist(
    (set) => ({
      selectedPost: null,
      setSelectedPost: (post: (IPost & { user: IUser }) | null) => set({ selectedPost: post }),
    }),
    {
      name: "posts-storage", // unique name for localStorage key
      partialize: (state) => ({ selectedPost: state.selectedPost }), // only persist selectedPost
    }
  )
);