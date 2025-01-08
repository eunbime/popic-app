import PostBox from "./post-box";

const PostList = () => {
  return (
    <div className="w-full h-full flex flex-col gap-10 px-7 pt-7">
      <PostBox />
      <PostBox />
      <PostBox />
      <PostBox />
      <PostBox />
    </div>
  );
};

export default PostList;
