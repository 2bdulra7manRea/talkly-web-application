import { useQuery } from "react-query";
import { NewPost } from "../../components/Post/post";
import { BlogCard } from "../../components/blog-card/blogCard";
import { SpinnerLoading } from "../../components/spinner-loading/spinnerLoading";
import { ErrorAlert } from "../../components/error-alert/errorAlert";
import BlogsApis from "../../core/network/apis/blogs";

const blogsService = new BlogsApis();

export const BlogsList = () => {
  const { data, isLoading, isError, error } = useQuery("blogs-list", () => {
    return blogsService.get();
  });

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (isError) {
    return <ErrorAlert message={error?.message} />;
  }

  return (
    <>
      <NewPost type={"blogs"}></NewPost>

      <div className="d-flex flex-wrap">
        {data?.data.data.map((postObj) => {
          return <BlogCard key={postObj._id} data={postObj}></BlogCard>;
        })}
      </div>
    </>
  );
};
