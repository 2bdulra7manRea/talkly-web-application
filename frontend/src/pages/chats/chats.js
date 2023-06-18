import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ChatCard } from "./chatCard";
import { ChatPage } from "./chatPage";
import "./chat.css";
import { SpinnerLoading } from "../../components/spinner-loading/spinnerLoading";
import { ErrorAlert } from "../../components/error-alert/errorAlert";
import ChatApis from "../../core/network/apis/chat";

const localSecurityId = localStorage.getItem("security_id");

const chatService = new ChatApis();

export const ChatList = () => {
  const { data, isLoading, isError, error } = useQuery("get-chats", () => {
    return chatService.get(localSecurityId);
  });

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (isError) {
    return <ErrorAlert message={error?.message} />;
  }

  return (
    <>
      <div className="row">
        <div className="col-3 container-side-bar-chat">
          <div className="side-bar-chat">
            {data?.data?.data.map((item) => {
              return <ChatCard key={item._id} data={item}></ChatCard>;
            })}
          </div>
        </div>
        <div className="col-9">
          <Routes>
            <Route path=":id" element={<ChatPage />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};
