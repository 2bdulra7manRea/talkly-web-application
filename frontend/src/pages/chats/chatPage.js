import { Send } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { MessageCard } from "../../components/message-card/messageCard";
import ChatApis from "../../core/network/apis/chat";
const chatService = new ChatApis();

export const ChatPageComp = () => {
  const mutata = useMutation((dataInfo) => {
    return chatService.post(dataInfo, "t/messages/new");
  });

  const { id } = useParams();

  const { data, isSuccess } = useQuery(
    `get-chat-messages${id}`,
    () => {
      console.log("send request-------[1]");
      return chatService.get(`t/messages/${id}`);
    },
    { enabled: !!id }
  );

  const messagesData = useQuery(
    `load-chat-messages`,
    () => {
      console.log("send request-------[2]");
      return chatService.get(`l/messages/${data?.data?.data?._id}`);
    },
    { enabled: isSuccess }
  );

  useEffect(() => {
    console.log("start-component");
    return () => {
      console.log("component_cleaned up");
    };
  }, []);

  console.log("component rendering.......");

  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  // id of the person
  const handleChangeMessage = (ev) => {
    setMessageBody(ev.target.value);
  };

  const sendMessage = () => {
    console.log(data);
    const SocketMessage = {
      content: messageBody,
      message_from: localStorage.getItem("security_id"),
      message_to: id,
      chatId: data?.data?.data?._id,
      date: new Date()
    };

    mutata.mutate(SocketMessage, {
      onSuccess: (d) => {
        console.log(d);
        setMessages([...messages, d.data.data]);
      },
      onError: (d) => {
        console.log(d);
      }
    });

    // setMessages([...messages, SocketMessage]);
    // console.log(messages);
    setMessageBody("");
  };

  return (
    <>
      <div className="chat-page">
        <div className="chat-header">
          <p>
            {data?.data?.data?.peerId.user_name} &{" "}
            {data?.data?.data?.userId.user_name}{" "}
          </p>
        </div>
        <div className="chat-content">
          {!messagesData?.data?.data?.data?.length !== 0 &&
            messagesData?.data?.data?.data?.map((item) => {
              return (
                <MessageCard
                  users={data?.data?.data}
                  data={item}
                  key={item._id}
                ></MessageCard>
              );
            })}
        </div>
        <div className="chat-action">
          <div className="row">
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
            <div className="col-9">
              <div className="input-comment">
                <textarea
                  value={messageBody}
                  onChange={handleChangeMessage}
                  placeholder="type a message"
                ></textarea>
              </div>
            </div>
            <div className="col-md-2" style={{ textAlign: "right" }}></div>
          </div>
          <div className="row">
            <div className="col-8"></div>
            <div
              className="col-4"
              style={{ textAlign: "right", paddingBottom: "2px" }}
            >
              <Button variant="text" onClick={sendMessage}>
                <Send></Send>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ChatPage = memo(ChatPageComp);
