import { Route, Routes } from "react-router-dom";
import { SideBar } from "../../components/sidebar/sidebar";
import { UserProfile } from "../../components/user-profile/userProfile";
import { BlogDetails } from "../blog-details/blog-details";
import { BlogsList } from "../blogs-list/blogsList";
import { EventList } from "../events-list/eventsList";
import { PostDetails } from "../post-details/post-details";
import { PostList } from "../posts-list/postLIst";
import { SearchPage } from "../search/searchPage";
import { SearchResultPage } from "../searchResult/searchResultPage";
import { UserView } from "../user-view/userView";

import "./home.css";
export const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-3" style={{ position: "relative" }}>
          <SideBar></SideBar>
        </div>
        <div className="col-md-8 main-list">
          <Routes>
            <Route path="/posts" element={<PostList />}></Route>
            <Route path="/posts/:id" element={<PostDetails />}></Route>
            <Route path="/blogs" element={<BlogsList />}></Route>
            <Route path="/search" element={<SearchPage />}></Route>
            <Route path="/search/:id" element={<SearchResultPage />}></Route>
            <Route path="/blogs/:id" element={<BlogDetails />}></Route>
            <Route
              path="/upcoming-events"
              element={<EventList></EventList>}
            ></Route>
            <Route path="/user" element={<UserProfile />}></Route>
            <Route path="/user-view/:securityId" element={<UserView />}></Route>
          </Routes>
        </div>
        <div className="col-md-1"></div>
      </div>
    </>
  );
};
