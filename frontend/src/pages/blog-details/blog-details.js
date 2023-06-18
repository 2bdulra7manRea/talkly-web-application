import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { CommentsList } from "../../components/comments-list/commentList";
import { LikeAction } from "../../components/likeAction/likeAction";
import { SpinnerLoading } from "../../components/spinner-loading/spinnerLoading";
import { ErrorAlert } from "../../components/error-alert/errorAlert";
import BlogsApis from "../../core/network/apis/blogs";

const blogsService = new BlogsApis();

export const BlogDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery(`get-blog-${id}`, () => {
    return blogsService.get(id);
  });

  const [loadComments, setLoadComment] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (isError) {
    return <ErrorAlert message={error.message} />;
  }

  const loadCommentList = () => {
    setLoadComment(true);
  };

  const displayTime = (d) => {
    return moment(d).fromNow();
  };

  const routeToProfile = () => {
    navigate(`/user-view/${data.data?.data.userId.securityId}`);
  };
  console.log(data.data?.data?._id);

  return (
    <div className="row card-post">
      <div className="col-md-12">
        <div className="row card-header-post">
          <div className="col-1">
            <div className="profile-image" onClick={routeToProfile}>
              <img
                src={
                  data.data?.data.userId?.image
                    ? data.data?.data?.userId?.image
                    : ""
                }
                alt="user-profile"
                width="100%"
                height="100%"
              ></img>
            </div>
          </div>
          <div className="col-md-11 post-header-title">
            <div className="d-flex flex-row profile-details-post">
              <h5 onClick={routeToProfile}>
                {data.data?.data?.userId?.user_name}
              </h5>
              <span className="time-display">{displayTime(data.date)}</span>
            </div>
          </div>
        </div>
        <div className="row card-content-post">
          <div className="col-md-12">
            <h3>{data.data?.data?.title}</h3>
            <CKEditor
              config={{ toolbar: [] }}
              disabled={true}
              editor={ClassicEditor}
              data={data.data?.data.body}
            ></CKEditor>
          </div>
        </div>
        <div className="row card-action-post">
          <div className="col-3">
            {!!data?.data?.data?._id && (
              <LikeAction contentId={data?.data?.data?._id}></LikeAction>
            )}
          </div>
          <div className="col-6">
            <button className="action-post-btn" onClick={loadCommentList}>
              <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
              Comment
            </button>
          </div>
          <div className="col-3"></div>
        </div>
        <div>
          {loadComments && (
            <CommentsList postId={data.data?.data._id}></CommentsList>
          )}
        </div>
      </div>
    </div>
  );
};
