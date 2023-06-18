import { CKEditor } from "@ckeditor/ckeditor5-react";
import { AccountCircle, Article } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const UserCard = ({ data }) => {
  const navigate = useNavigate();

  const routeToUserPage = () => {
    navigate(`/user-view/${data.securityId}`, { replace: true });
  };

  return (
    <div className="card-search" onClick={routeToUserPage}>
      <div className="row  ">
        <div className="col-1 search-card-icon">
          <AccountCircle></AccountCircle>
        </div>
        <div className="col-10">
          <h6>{data.user_name}</h6>
        </div>
        <div className="col-1 result-search">
          <span>{data.type}</span>
        </div>
      </div>
    </div>
  );
};

export const GeneralCard = ({ data }) => {
  const navigate = useNavigate();

  const routeBlogPage = () => {
    if (data.type === "post") {
      navigate(`/posts/${data._id}`, { replace: true });
    } else {
      navigate(`/blogs/${data._id}`, { replace: true });
    }
  };

  return (
    <div className="card-search" onClick={routeBlogPage}>
      <div className="row  ">
        <div className="col-1 search-card-icon">
          <Article />
        </div>
        <div className="col-10">
          <h6>{data.title}</h6>
          <CKEditor
            config={{ toolbar: [] }}
            disabled={true}
            editor={ClassicEditor}
            data={data.body}
          ></CKEditor>
        </div>
        <div className="col-1 result-search ">
          <span>{data.type}</span>
        </div>
      </div>
    </div>
  );
};
