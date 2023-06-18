import { useQuery } from "react-query";
import CommentsApis from "../../core/network/apis/comments";
import { CommentCard } from "../comment-card/commentCard";
import { CreateComment } from "../comment-create/commentCreate";
import { ErrorAlert } from "../error-alert/errorAlert";
import { SpinnerLoading } from "../spinner-loading/spinnerLoading";
import "./commentList.css";

const commentService = new CommentsApis();

export const CommentsList = ({ postId }) => {
  const { data, isLoading, error, isError } = useQuery(
    `get-comments${postId}`,
    () => {
      return commentService.get(postId);
    }
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (isError) {
    return <ErrorAlert message={error.message} />;
  }

  console.log(data);

  return (
    <div className="comments-list">
      {data.data?.data.map((item) => {
        return <CommentCard data={item} key={item._id}></CommentCard>;
      })}

      <CreateComment postId={postId}></CreateComment>
    </div>
  );
};
