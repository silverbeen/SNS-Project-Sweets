import React from "react";

const ProfileChange = ({ profileObj }) => {
  return (
    <img
      className="my-face"
      src={profileObj.profileURL}
      style={{
        backgroundImage: profileObj.profileURL,
      }}
    />
  );
};

export default ProfileChange;
