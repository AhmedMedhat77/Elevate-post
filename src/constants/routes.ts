import { CreatePost, PostById, PostsScreen } from "@/pages";

export const ROUTES = [
  {
    path: "/",
    element: PostsScreen,
  },
  {
    path: "/posts/create",
    element: CreatePost,
  },
  {
    path: "/posts/:id",
    element: PostById,
  },
];
