import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "../profile-menu/profile-menu";
import "./header.css";

export const HeaderMain = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/home", { replace: true });
  };

  return (
    <>
      <div className="row main-header-home">
        <div className="col-3 main-title-header">
          <h1 onClick={goToMain}>Talky</h1>
        </div>
        <div className="col-6"></div>
        <div className="col-3">
          <ProfileMenu />
        </div>
      </div>
    </>
  );
};
