import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ChatCard = ({ data }) => {
  const navigate = useNavigate();

  const routeToChatMessage = () => {
    const securityId = localStorage.getItem("security_id");
    if (data.userId.securityId === securityId) {
      navigate(`/chats/${data.peerId.securityId}`);
      return;
    } else {
      navigate(`/chats/${data.userId.securityId}`);
    }
  };

  const displayName = (dataInfo) => {
    const securityId = localStorage.getItem("security_id");
    if (dataInfo.userId.securityId === securityId) {
      return dataInfo.peerId.user_name;
    }

    return dataInfo.userId.user_name;
  };

  console.log(data);

  return (
    <>
      <div className="chat-card" onClick={routeToChatMessage}>
        <div className="row">
          <div className="col-3">
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
          <div className="col-9">
            <h6>{displayName(data)}</h6>
            <p>
              I would like to travel to canada or UK or Germany I would like to
              travel to canada or UK or Germany I would like to travel to canada
              or UK or Germany I would like to travel to canada or UK or Germany
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
