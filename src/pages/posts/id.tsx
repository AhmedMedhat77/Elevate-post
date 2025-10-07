import { usePostsStore } from "@/store/usePostsStore";
import { ArrowLeft, CalendarDays, User2 } from "lucide-react";
import { Link } from "react-router";

const PostById = () => {
  const { selectedPost } = usePostsStore();

  return (
    <div className="container h-[80vh]  ">
      {/* Header  */}
      <div className="flex flex-col gap-4  h-[50%] justify-end pb-20  relative text-white px-6 ">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/70 via-sky-900/40 to-sky-900/70 rounded-t-xl" />
        <div className="z-10 grid gap-5">
          <Link
            to="/"
            className="flex flex-row items-center gap-2 bg-white/75 px-2 py-2 rounded-md w-fit text-black"
          >
            <ArrowLeft size={20} />
            Back to Posts
          </Link>
          <h1 className=" font-bold text-2xl lg:text-4xl max-w-[70%]">{selectedPost?.title}</h1>

          <div className="flex flex-row gap-2">
            <h2 className="flex flex-row items-center gap-2">
              <User2 size={20} />
              {selectedPost?.user.name}
            </h2>
            <h2 className="flex flex-row items-center gap-2">
              <CalendarDays size={20} />
              {new Date().toDateString()}
            </h2>
          </div>
        </div>
      </div>
      {/* Post Body  */}
      <div className="flex flex-row gap-4 relative h-[50%] px-6 ">
        <div className="absolute inset-0  backdrop rounded-b-xl" />
        <p className="z-10 w-[50%] text-sm py-3 lg:text-xl">{selectedPost?.body || ""}</p>
      </div>
    </div>
  );
};

export default PostById;
