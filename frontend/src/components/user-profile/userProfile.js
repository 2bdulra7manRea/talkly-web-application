import { useQuery } from "react-query";
import AuthApis from "../../core/network/apis/auth";
import { ProfileUserTabs } from "../cutomTab/customTab";
import { ErrorAlert } from "../error-alert/errorAlert";
import { SpinnerLoading } from "../spinner-loading/spinnerLoading";
import { UploadImageProfile } from "../upload-card/uploadCard";
import "./userProfile.css";
const authService = new AuthApis();
export const UserProfile = () => {
  const { isLoading, data, isError, error } = useQuery(`user-profile`, () => {
    return authService.get("user-profile");
  });
  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (isError) {
    return <ErrorAlert message={error?.message} />;
  }

  return (
    <>
      <div className="row main-header">
        <div className="col-md-3">
          <div className="main-image-profile">
            <img
              src={data.data?.data?.image ? data.data.data.image : ""}
              width={"100%"}
              height={"100%"}
              alt="profile-user-main"
            ></img>
          </div>
          <div>
            <UploadImageProfile />
          </div>
        </div>
        <div className="col-md-9 profile-header-details">
          <h4>{data.data?.data?.user_name}</h4>
          <h5>{data.data?.data?.job_title}</h5>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 p-4">
          <ProfileUserTabs user={data.data?.data}></ProfileUserTabs>
        </div>
      </div>
    </>
  );
};
