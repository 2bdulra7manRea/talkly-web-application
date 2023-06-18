import { PostCard } from "../../components/post-card/postCard";
import { useQuery } from "react-query";
import { NewPost } from "../../components/Post/post";
import { SpinnerLoading } from "../../components/spinner-loading/spinnerLoading";
import { ErrorAlert } from "../../components/error-alert/errorAlert";
import PostsApis from "../../core/network/apis/posts";

const postService = new PostsApis();

export const PostList = () => {
  const { data, isLoading, isError, error } = useQuery("posts-list", () => {
    return postService.get();
  });

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (isError) {
    return <ErrorAlert message={error?.message} />;
  }

  return (
    <>
      <NewPost type={"posts"}></NewPost>

      {data?.data.data.map((postObj) => {
        return <PostCard key={postObj._id} data={postObj}></PostCard>;
      })}
    </>
  );
};
