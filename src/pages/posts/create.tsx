import { CustomSelect, FormField, Input, Textarea } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { useCreatePost } from "@/hooks/useCreatePost";
import { createPostSchema, type ICreatePostForm } from "@/utils";

import { NotebookPen } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ErrorComponent } from "@/components";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUsers } from "@/hooks/useGetUsers";
import type { IUser } from "@/types";
import { usePostsStore } from "@/store/usePostsStore";

const CreatePost = () => {
  const { mutate, isPending, error } = useCreatePost();
  const { addPost } = usePostsStore();  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch users for the dropdown
  const { data: users } = useGetUsers();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePostForm>({
    defaultValues: {
      title: "",
      body: "",
      userId: 1,
    },
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = handleSubmit((data: ICreatePostForm) => {
    mutate(data, {
      onSuccess: (response) => {
        // Add the new post to the store to prevent duplicates
        if (response.data) {
          addPost(response.data);
        }
        toast.success("Post created successfully");
        navigate("/");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : "Failed to create post";
        toast.error(errorMessage);
      },
    });
  });

  return (
    <div className="container h-full backdrop rounded-xl flex flex-col ">
      {/* Header */}
      <div className="flex flex-row items-center justify-between bg-white p-4 rounded-t-xl">
        <h3 className="flex flex-row items-center gap-2">
          <NotebookPen size={20} color="black" />
          Create a New Post
        </h3>
      </div>

      {/* Form takes remaining space */}
      <div className="flex-1 p-6">
        <form
          className="bg-white w-full md:w-[75%] rounded-md p-6 grid gap-2 h-full"
          onSubmit={onSubmit}
        >
          <div className="space-y-8 flex flex-col">
            <Input
              {...register("title")}
              label="Title"
              placeholder="Enter post title"
              className="gray-input"
              error={errors.title?.message}
            />
            <Textarea
              {...register("body")}
              label="Body"
              placeholder="Enter post Body"
              className="gray-textarea"
              error={errors.body?.message}
            />

            <Controller
              name="userId"
              control={control}
              render={({ field }) => (
                <FormField error={errors.userId?.message}>
                  <CustomSelect
                    label="Author"
                    placeholder="Select Author"
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    {users?.data.map((user: IUser) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </CustomSelect>
                </FormField>
              )}
            />

            <ErrorComponent error={error?.message} />

            <Button disabled={isPending} className=" self-end h-10 w-full lg:w-[50%]">
              {isPending ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
