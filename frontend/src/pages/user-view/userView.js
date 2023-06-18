import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileUserTabs } from "../../components/cutomTab/customTab";
import { ErrorAlert } from "../../components/error-alert/errorAlert";
import { SpinnerLoading } from "../../components/spinner-loading/spinnerLoading";
import AuthApis from "../../core/network/apis/auth";
import ChatApis from "../../core/network/apis/chat";

import "./userProfile.css";

const localSecurityId = localStorage.getItem("security_id");

const authService = new AuthApis();
const chatService = new ChatApis();

export const UserView = () => {
  const { securityId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useQuery(
    `user-profile-${securityId}`,
    () => {
      console.log("sned request user-view");
      return authService.get(`user/${securityId}`);
    }
  );

  const matuate = useMutation((data) => chatService.post(data, "new"));

  useEffect(() => {
    if (securityId === localSecurityId) {
      console.log(securityId);
      navigate("/user", { replace: true });
    }
  }, [navigate, securityId]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (isError) {
    return <ErrorAlert message={error?.message} />;
  }

  const routeToChat = () => {
    matuate.mutate(
      { securityId: data.data?.data?.securityId },
      {
        onSuccess: () => {
          navigate(`/chats/${data.data?.data?.securityId}`);
        }
      }
    );
  };

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
        </div>
        <div className="col-md-9 profile-header-details">
          <h4>{data.data?.data?.user_name}</h4>
          <h5>{data.data?.data?.job_title}</h5>
          <button onClick={routeToChat} className="stand-btn">
            Messages
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 p-4">
          <ProfileUserTabs user={data.data?.data} view={true}></ProfileUserTabs>
        </div>
      </div>
    </>
  );
};
