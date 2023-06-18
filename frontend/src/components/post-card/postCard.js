import "./postCard.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CommentsList } from "../comments-list/commentList";
import { useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { LikeAction } from "../likeAction/likeAction";
import CommentsApis from "../../core/network/apis/comments";

const commentService = new CommentsApis();

export const PostCard = ({ data }) => {
  const navigate = useNavigate();
  const [loadComments, setLoadComment] = useState(false);

  const loadCommentList = () => {
    setLoadComment(true);
  };

  const { data: commentsData } = useQuery(
    `get-comments-number${data._id}`,
    () => {
      return commentService.getCount(data._id);
    }
  );

  const displayTime = (d) => {
    return moment(d).fromNow();
  };

  const routeToProfile = () => {
    navigate(`/user-view/${data.userId.securityId}`);
  };

  return (
    <div className="row card-post">
      <div className="col-md-12">
        <div className="row card-header-post">
          <div className="col-1">
            <div className="profile-image" onClick={routeToProfile}>
              <img
                src={data?.userId?.image ? data?.userId?.image : ""}
                alt="user-profile"
                width="100%"
                height="100%"
              ></img>
            </div>
          </div>
          <div className="col-md-11 post-header-title">
            <div className="d-flex flex-row profile-details-post">
              <h5 onClick={routeToProfile}>{data?.userId?.user_name}</h5>
              <span className="time-display">{displayTime(data.date)}</span>
            </div>
          </div>
        </div>
        <div className="row card-content-post">
          <div className="col-md-12">
            <h3>{data?.title}</h3>
            <CKEditor
              config={{ toolbar: [] }}
              disabled={true}
              editor={ClassicEditor}
              data={data.body}
            ></CKEditor>
          </div>
        </div>
        <div className="row card-action-post">
          <div className="col-3">
            <LikeAction contentId={data._id}></LikeAction>
          </div>
          <div className="col-6">
            <button className="action-post-btn" onClick={loadCommentList}>
              <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
              Comment
            </button>
          </div>
          <div className="col-3">
            <button className="action-post-btn">
              {commentsData?.data?.data || 0} comments
            </button>
          </div>
        </div>
        <div>
          {loadComments && <CommentsList postId={data._id}></CommentsList>}
        </div>
      </div>
    </div>
  );
};
