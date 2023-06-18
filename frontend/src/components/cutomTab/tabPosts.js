import { useQuery } from "react-query";
import PostsApis from "../../core/network/apis/posts";
import { PostCard } from "../post-card/postCard";
import { SpinnerLoading } from "../spinner-loading/spinnerLoading";
const postsService = new PostsApis();
export const TabPosts = () => {
  const { data, isLoading } = useQuery("get-user-p-posts", () => {
    return postsService.get("user");
  });

  if (isLoading) {
    return <SpinnerLoading />;
  }
  console.log(data);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {data?.data?.data.map((postObj) => {
            return <PostCard key={postObj._id} data={postObj}></PostCard>;
          })}
        </div>
      </div>
    </>
  );
};
