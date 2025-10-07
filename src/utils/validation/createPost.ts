import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string({
      error: "Post title is required",
    })
    .min(3, {
      error: "Post title must be at least 3 characters",
    }),
  body: z.string().min(3, {
    error: "Post body must be at least 3 characters",
  }),
  userId: z
    .number({
      error: "Please Select an Author for the post",
    })
    .min(1, {
      error: "Please Select an Author for the post",
    }),
});

export type ICreatePostForm = z.infer<typeof createPostSchema>;
