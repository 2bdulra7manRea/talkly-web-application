import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useMutation } from "react-query";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { uploadFiles } from "../../core/helpers/fileUpload";
import AuthApis from "../../core/network/apis/auth";

const authService = new AuthApis();

function saveImage(data) {
  return authService.patch(data, "user");
}

export const UploadImageProfile = () => {
  const Mutation = useMutation(saveImage);

  const [open, setOpen] = useState(false);
  const [inputsData, setInputData] = useState({ image: "" });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const url = await uploadFiles(inputsData.image);

    if (!!url) {
      Mutation.mutate(
        { image: url },
        {
          onSuccess: (response) => {
            handleClose();
            localStorage.setItem("img_prof", url);
            console.log("succsseded", response);
          },
          onError: (error) => {
            console.log(error);
          }
        }
      );
    }
  };

  const handleOnChange = (ev) => {
    console.log(ev);
    const file = ev?.target.files;
    console.log(file);
    setInputData({ image: file });
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <span className="image-upload-icon">
          <DriveFolderUploadIcon />
        </span>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ backgroundColor: "rgb(46, 46, 46) !important" }}>
          <div className="new-post">
            <div>
              <input
                type="file"
                onChange={handleOnChange}
                alt="profile-upload-pic"
              ></input>
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "rgb(46, 46, 46)!important" }}>
          <button className="stand-btn" onClick={handleSubmit}>
            upload
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
