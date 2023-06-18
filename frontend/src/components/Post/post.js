import { NewEditor } from "../editor/editor";
import "./post.css";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "react-query";
import { Avatar } from "@mui/material";
import PostsApis from "../../core/network/apis/posts";
import BlogsApis from "../../core/network/apis/blogs";

const postService = new PostsApis();
const blogService = new BlogsApis();

function createPost(data, type) {
  if (type === "blogs") {
    return blogService.post(data, "new");
  } else {
    return postService.post(data, "new");
  }
}

export const NewPost = ({ type }) => {
  const Mutation = useMutation((data) => createPost(data, type));

  const [open, setOpen] = useState(false);
  const [inputsData, setInputData] = useState({ title: "", body: "" });

  useEffect(() => {
    return () => {
      console.log("clean up");
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputData({ title: "", body: "" });
  };

  const handleSubmit = () => {
    const preparedData = {
      body: inputsData.body,
      date: new Date()
    };

    if (inputsData.title) {
      preparedData.title = inputsData.title;
    }

    Mutation.mutate(preparedData, {
      onSuccess: (response) => {
        handleClose();
        console.log("succsseded", response);
      },
      onError: (error) => {
        console.log(error);
      }
    });

    console.log(inputsData);
  };

  const handleOnChange = (ev) => {
    setInputData({ ...inputsData, title: ev.target.value });
  };
  return (
    <div>
      <div
        className="row card-post header-add-post mt-4 mb-4"
        onClick={handleClickOpen}
      >
        <div className="col-1">
          <Avatar sx={{ width: 50, height: 50, objectFit: "contain" }}>
            {localStorage.getItem("img_prof") ? (
              <img
                width={"100%"}
                height={"100%"}
                src={localStorage.getItem("img_prof")}
                alt="avatar"
              />
            ) : (
              "A"
            )}
          </Avatar>
        </div>
        <div className="col-md-5 start-post">
          <h6>Start a {type === "blogs" ? "blog" : "post"}</h6>
        </div>
        <div className="col-md-6 add-icon-post ">
          <span>
            {" "}
            <AddIcon />
          </span>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ backgroundColor: "rgb(46, 46, 46) !important" }}>
          <div className="new-post">
            <div>
              <textarea
                onChange={handleOnChange}
                value={inputsData.title}
                placeholder="Title (Optional)"
              ></textarea>
            </div>

            <div>
              <NewEditor
                inputData={inputsData}
                setInputData={setInputData}
              ></NewEditor>
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "rgb(46, 46, 46)!important" }}>
          <button className="stand-btn" onClick={handleSubmit}>
            Publish
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
