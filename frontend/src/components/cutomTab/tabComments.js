import { useQuery } from "react-query";
import CommentsApis from "../../core/network/apis/comments";
import { CommentCard } from "../comment-card/commentCard";
import { SpinnerLoading } from "../spinner-loading/spinnerLoading";
const commentService = new CommentsApis();
export const TabComments = () => {
  const { data, isLoading } = useQuery("get-user-l-comments", () => {
    return commentService.generalQuery("user");
  });

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {data?.data?.data.map((postObj) => {
            return (
              <CommentCard
                showPost={true}
                key={postObj._id}
                data={postObj}
              ></CommentCard>
            );
          })}
        </div>
      </div>
    </>
  );
};
