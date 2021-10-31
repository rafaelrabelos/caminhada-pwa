import React from "react";
import { __CONSTS, __TEXTS, __LANG } from "../../utils/constants";
import undefinedUserImage from "./assets/images/undefined-user.png";
import "./logedInUser.css";

const LogedInUser = (props) => {
  const { orientation, size } = props;
  const texts = __TEXTS[__LANG];

  const { userName, userImageURL } = props;

  const orientationClass = {
    default: "user-profile-vertical",
    [__CONSTS.orientations.vertical]: "user-profile-vertical",
    [__CONSTS.orientations.horizontal]: "user-profile-horizontal",
  };

  const sizeClass = {
    default: "user-profile-md",
    [__CONSTS.sizes.sm]: "user-profile-sm",
    [__CONSTS.sizes.smx]: "user-profile-sm-x",
    [__CONSTS.sizes.md]: "user-profile-md",
    [__CONSTS.sizes.mdx]: "user-profile-md-x",
    [__CONSTS.sizes.xg]: "user-profile-xg",
    [__CONSTS.sizes.xgx]: "user-profile-xg-x",
    [__CONSTS.sizes.full]: "user-profile-xg-x",
  };

  const finalClass = `user-profile 
  ${orientationClass[orientation || "default"]} 
  ${sizeClass[size || "default"]}`;

  const handleNoLogOffCallback = (e) => {
    sessionStorage.clear();
    localStorage.clear();
  };

  return (
    <div className={finalClass}>
      <img
        alt={`${texts.userProfileImage} ${userName || ""}`}
        id="user-image"
        src={userImageURL || undefinedUserImage}
      />
      <div id="logedin-info" className="texts-small logedin-info">
        <small>
          {texts.logedInAs} <b id="user-name">{userName}</b>
          <br />
        </small>{" "}
        <a
          id="log-out"
          href="/#"
          onClick={props.onLogoffClick || handleNoLogOffCallback}
        >
          {texts.logOut}
        </a>
      </div>
    </div>
  );
};

export default LogedInUser;
