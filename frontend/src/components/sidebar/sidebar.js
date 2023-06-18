import { Link } from "react-router-dom";
import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookOnLineIcon from "@mui/icons-material/BookOnline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export const SideBar = () => {
  const [currentItem, setCurrentItem] = useState("");

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link
            to={"/search"}
            className={currentItem === "search" ? "current-item-sidebar" : ""}
            onClick={() => setCurrentItem("search")}
          >
            <span>
              <SearchIcon />
            </span>
            Search
          </Link>
        </li>
        <li>
          <Link
            to={"/home"}
            className={currentItem === "home" ? "current-item-sidebar" : ""}
            onClick={() => setCurrentItem("home")}
          >
            <span>
              <HomeIcon />
            </span>
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/posts"}
            className={currentItem === "posts" ? "current-item-sidebar" : ""}
            onClick={() => setCurrentItem("posts")}
          >
            <span>
              <HomeIcon />
            </span>
            Posts
          </Link>
        </li>
        <li>
          <Link
            className={currentItem === "blogs" ? "current-item-sidebar" : ""}
            to={"/blogs"}
            onClick={() => setCurrentItem("blogs")}
          >
            <span>
              <BookOnLineIcon />
            </span>
            blogs & articles
          </Link>
        </li>
        <li>
          <Link
            className={currentItem === "events" ? "current-item-sidebar" : ""}
            to={"/upcoming-events"}
            onClick={() => setCurrentItem("events")}
          >
            <span>
              <CalendarMonthIcon />
            </span>
            Upcoming Events
          </Link>
        </li>
        <li>
          <Link
            className={currentItem === "chats" ? "current-item-sidebar" : ""}
            to={"/chats"}
            onClick={() => setCurrentItem("chats")}
          >
            <span>
              <ChatBubbleIcon />
            </span>
            chats
          </Link>
        </li>
      </ul>
    </div>
  );
};
