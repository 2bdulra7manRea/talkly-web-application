import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { CommentsList } from "../../components/comments-list/commentList";
import { SpinnerLoading } from "../../components/spinner-loading/spinnerLoading";
import { ErrorAlert } from "../../components/error-alert/errorAlert";
import PostsApis from "../../core/network/apis/posts";
const postService = new PostsApis();
export const PostDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery(`get-post-${id}`, () => {
    return postService.get(`details/${id}`);
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
            <button className="action-post-btn">
              <ThumbUpOffAltIcon></ThumbUpOffAltIcon> Like
            </button>
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
