import { useState } from "react";
import "./tabsProfile.css";
import { TabAbout } from "./tabAbout";
import { ButtonTab } from "./tabButtonCustom";
import { TabComments } from "./tabComments";
import { TabPosts } from "./tabPosts";
import { TabSettingsProfile } from "./tabSetting";

const tabsData = {
  ABOUT: "about",
  POSTS: "posts",
  COMMENTS: "comments",
  SETTINGS: "settings"
};

export const ProfileUserTabs = ({ user, view }) => {
  const [tabCurrentValue, setTabs] = useState("about");

  const handleTabs = (type) => {
    setTabs(type);
  };

  const displayComponent = (value) => {
    switch (value) {
      case tabsData.ABOUT:
        return <TabAbout user={user} />;
      case tabsData.POSTS:
        return <TabPosts />;
      case tabsData.COMMENTS:
        return <TabComments />;
      case tabsData.SETTINGS:
        return (
          <TabSettingsProfile
            user={{
              ...user,
              username: user.user_name
            }}
          />
        );
      default:
        return <p></p>;
    }
  };

  return (
    <>
      <div className="tabs-btn">
        <ButtonTab
          value={tabsData.ABOUT}
          tabCurrentValue={tabCurrentValue}
          handleTabs={handleTabs}
        ></ButtonTab>
        {!view && (
          <>
            <ButtonTab
              value={tabsData.POSTS}
              tabCurrentValue={tabCurrentValue}
              handleTabs={handleTabs}
            ></ButtonTab>
            <ButtonTab
              value={tabsData.COMMENTS}
              tabCurrentValue={tabCurrentValue}
              handleTabs={handleTabs}
            ></ButtonTab>
            <ButtonTab
              value={tabsData.SETTINGS}
              tabCurrentValue={tabCurrentValue}
              handleTabs={handleTabs}
            ></ButtonTab>
          </>
        )}
      </div>

      <div className="tabs-componenets p-4">
        {displayComponent(tabCurrentValue)}
      </div>
    </>
  );
};
