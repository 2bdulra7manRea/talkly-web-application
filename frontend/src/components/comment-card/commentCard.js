import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { Link } from "react-router-dom";
import "./commentCard.css";

const url =
  "https://images.unsplash.com/photo-1675866528992-3b9148f23e8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

export const CommentCard = ({ data, showPost }) => {
  const displayTime = (d) => {
    return moment(d).fromNow();
  };

  return (
    <div className="comment-card">
      <div className="row mt-4 mb-5">
        <div className="col-1">
          <div className="profile-image">
            <img
              src={data?.userId?.image ? data?.userId?.image : url}
              alt="user-profile"
              width="100%"
              height="100%"
            ></img>
          </div>
        </div>
        <div className="col-9">
          <div style={{ display: "flex" }}>
            <h6>{data?.userId?.user_name}</h6>
            <p className="time-display">{displayTime(data.date)}</p>
          </div>

          <p>{data.body}</p>

          <div className="row">
            <div className="col-2">
              <button className="action-post-btn">Like</button>
            </div>
            <div className="col-5">
              <button className="action-post-btn">replay</button>
            </div>
            {showPost && (
              <div className="col-3">
                <Link
                  className="action-post-btn"
                  to={`/home/posts/${data._id}`}
                >
                  Orginal Post
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="col-2 comment-actions-right">
          <MoreHorizIcon></MoreHorizIcon>
          <div>
            <button className="action-post-btn">4 Likes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
