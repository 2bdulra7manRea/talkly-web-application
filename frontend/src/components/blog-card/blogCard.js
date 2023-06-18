import "./blogCard.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const BlogCard = ({ data }) => {
  const nav = useNavigate();
  const displayTime = (d) => {
    return moment(d).fromNow();
  };

  const routeToBlog = () => {
    nav(`/blogs/${data._id}`, { replace: true });
  };

  return (
    <div className="blog-card card-post m-2" onClick={routeToBlog}>
      <div className="row card-header-post">
        <div className="col-md-12 post-header-title">
          <div className="d-flex flex-row profile-details-post">
            <h5>{data?.userId?.user_name}</h5>
            <span className="time-display">{displayTime(data.date)}</span>
          </div>
        </div>
      </div>
      <div className="row blog-content-post">
        <div className="col-md-12">
          <p>{data?.title}</p>
          <CKEditor
            config={{ toolbar: [] }}
            disabled={true}
            editor={ClassicEditor}
            data={data.body}
          ></CKEditor>
        </div>
      </div>
    </div>
  );
};
