import { Avatar } from "@mui/material";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import "./messageCard.css";

const MessageCardComponent = ({ users, data }) => {
  const [coreMessage, setCoreMessage] = useState({});

  useEffect(() => {
    const security_id = localStorage.getItem("security_id");
    if (!!users && !!data) {
      if (data.message_to === users.peerId.securityId) {
        setCoreMessage({
          ...data,
          message_to: users.peerId,
          message_from: users.userId,
          sender: security_id === data.message_from,
          receiver: security_id === data.message_to
        });
      } else {
        setCoreMessage({
          ...data,
          message_to: users.userId,
          message_from: users.peerId,
          sender: security_id === data.message_from,
          receiver: security_id === data.message_to
        });
      }
    }
  }, [data, users]);

  return (
    <>
      <div className="message-card">
        <div className="row">
          <div className="col-1">
            {coreMessage?.receiver && (
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
            )}
          </div>

          <div
            className="col-11 d-flex"
            style={{ justifyContent: coreMessage?.sender ? "end" : "left" }}
          >
            <div
              className="message-content"
              style={{
                backgroundColor: coreMessage?.receiver ? "rgb(83, 83, 83)" : ""
              }}
            >
              <div className="header-message">
                {coreMessage?.receiver && (
                  <h6>{coreMessage?.message_from.user_name}</h6>
                )}{" "}
                <span style={{ fontSize: "10px" }}>
                  {moment(data.date).fromNow()}
                </span>
              </div>
              <p>{data.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const MessageCard = memo(MessageCardComponent);
