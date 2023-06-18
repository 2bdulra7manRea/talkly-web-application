import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { HeaderMain } from "../../components/header/header";
import { ChatList } from "../chats/chats";
import { Home } from "../home/home";
axios.interceptors.request.use(
  (config) => {
    console.log("........[AXIOS INTERCEPTORS]");
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const Main = () => {
  useEffect(() => {}, []);

  return (
    <div className="main-app">
      <HeaderMain></HeaderMain>
      <Routes>
        <Route path="/chats/*" element={<ChatList />}></Route>
        <Route path="/*" element={<Home />}></Route>
      </Routes>
    </div>
  );
};
