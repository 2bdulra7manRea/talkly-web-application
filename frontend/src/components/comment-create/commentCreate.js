import { Button } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import "./commentCreate.css";
import Snackbar from "@mui/material/Snackbar";
import CommentsApis from "../../core/network/apis/comments";

const commentService = new CommentsApis();

const url =
  "https://images.unsplash.com/photo-1675866528992-3b9148f23e8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

const addComment = (data) => {
  return commentService.post(data, "new");
};

export const CreateComment = ({ postId }) => {
  const mutation = useMutation(addComment);
  const [snackbarStatus, sentSnackbarStatus] = useState(false);

  const [commentBody, setCommentBody] = useState("");

  const handleChange = (ev) => {
    setCommentBody(ev.target.value);
  };

  const handleSubmit = () => {
    const preparedData = {
      postId,
      userId: "101010011",
      body: commentBody,
      date: new Date()
    };
    console.log(preparedData);

    mutation.mutate(preparedData, {
      onError: (er) => {
        console.log(er);
      },
      onSuccess: () => {
        setCommentBody("");
        sentSnackbarStatus(true);
        console.log("Successed");
      }
    });
  };

  return (
    <>
      <div className="row create-comment">
        <div className="col-1">
          <div className="profile-image">
            <img
              src={url ? url : ""}
              alt="user-profile"
              width="100%"
              height="100%"
            ></img>
          </div>
        </div>
        <div className="col-md-11 comment-box-input ">
          <div className="input-comment">
            <textarea
              value={commentBody}
              onChange={handleChange}
              placeholder="What do you think ?"
            ></textarea>
          </div>
          <div className="row">
            <div className="col-8"></div>
            <div className="col-4" style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                disabled={!commentBody}
                onClick={handleSubmit}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarStatus}
        autoHideDuration={6000}
        onClose={() => sentSnackbarStatus(false)}
        message="Your comment has been added successfully !"
      />
    </>
  );
};
