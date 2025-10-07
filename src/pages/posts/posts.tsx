import Pagination from "@/components/pagination";
import PostItem from "@/components/Post/PostItem";
import SearchInput from "@/components/inputs/search";
import { SelectItem } from "@/components/ui/select";
import { useGetPosts } from "@/hooks/useGetPosts";
import { usePostsStore } from "@/store/usePostsStore";
import { Info, Plus, ScrollText } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { CustomSelect, LoaderOverlay } from "@/components";
import { useGetUsers } from "@/hooks/useGetUsers";
import type { IUser } from "@/types";

const PostsScreen = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { setSelectedPost } = usePostsStore();
  const { data: users } = useGetUsers();
  const { data, error, isLoading } = useGetPosts({
    page,
    limit,
    id: userId,
  });

  // Show Toast on Error
  useEffect(() => {
    if (error) {
      toast.error("This is an error", {
        icon: <Info className="text-red-500" size={16} />,
        className: "bg-black",
      });
    }
  }, [error]);

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / limit));

  return (
    <div className=" container">
      <div className="backdrop rounded-2xl relative">
        {/* Header  */}
        <div className="py-5 px-6 bg-white flex flex-row items-center justify-between rounded-t-2xl">
          <h3 className="flex flex-row items-center gap-2">
            <ScrollText size={20} color="black" />
            Post List
          </h3>
          <Link to="/posts/create" className="flex flex-row items-center gap-2 text-gray-500">
            <Plus size={20} />
            Create A new post
          </Link>
        </div>

        {/* Search and Sort  */}
        <div className="flex flex-row items-center justify-between py-5 px-6 gap-3 bg-black/10 border border-black/15 ">
          <SearchInput
            onSearch={(value) => console.log(value)}
            placeholder="Search for a post..."
            className="py-4 px-8 bg-white rounded-2xl h-12"
          />
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="sort">Author:</label>
            <CustomSelect
              className="bg-white"
              value={userId?.toString() || data?.data[0].userId.toString()}
              onValueChange={(value) => setUserId(parseInt(value))}
            >
              {users?.data.map((user: IUser) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.name}
                </SelectItem>
              ))}
            </CustomSelect>
          </div>
        </div>

        {/* Post List  */}
        <div className=" max-h-[650px] overflow-y-auto ">
          {data?.data.map((post) => (
            <Link
              to={`/posts/${post.id}`}
              key={post.id}
              onClick={() =>
                setSelectedPost({
                  ...post,
                  user: users?.data.find((user) => user.id === post.userId) as IUser,
                })
              }
            >
              <PostItem id={post.id} title={post.title} />
            </Link>
          ))}
        </div>

        {isLoading && <LoaderOverlay />}

        {/* Footer  */}
        <div className="bg-white py-4 flex flex-row justify-center items-center absolute bottom-0 left-0 right-0 rounded-b-2xl">
          <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default PostsScreen;
