interface PostItemProps {
  id: number;
  title: string;
}
const PostItem = ({ id, title }: PostItemProps) => {
  return (
    <div
      key={id}
      className="w-full border-b  border-black/15 duration-200 py-2  hover:bg-white/50 cursor-pointer"
    >
      <h4 className="text-lg px-6 pb-2 ">{title}</h4>
    </div>
  );
};

export default PostItem;
