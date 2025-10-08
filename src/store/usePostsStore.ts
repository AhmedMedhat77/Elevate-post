import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IPost, IUser } from "@/types";

interface PostsStore {
  selectedPost: (IPost & { user: IUser }) | null;
  setSelectedPost: (post: (IPost & { user: IUser }) | null) => void;
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
  addPost: (post: IPost) => void;
  updatePost: (post: IPost) => void;
  clearPosts: () => void;
}

export const usePostsStore = create<PostsStore>()(
  persist(
    (set) => ({
      selectedPost: null,
      setSelectedPost: (post: (IPost & { user: IUser }) | null) => set({ selectedPost: post }),
      posts: [],
      setPosts: (posts: IPost[]) => set({ posts }),
      addPost: (post: IPost) => set((state) => {
        // Check if post already exists to prevent duplicates
        const exists = state.posts.some(p => p.id === post.id);
        if (exists) return state;
        return { posts: [post, ...state.posts] };
      }),
      updatePost: (post: IPost) => set((state) => ({
        posts: state.posts.map((p) => (p.id === post.id ? post : p))
      })),
      clearPosts: () => set({ posts: [] }),
    }),
    {
      name: "posts-storage", // unique name for localStorage key
      partialize: (state) => ({ selectedPost: state.selectedPost }), // only persist selectedPost
    }
  )
);
