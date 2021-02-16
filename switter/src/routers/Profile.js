import { authService, dbService, storageService } from "../myBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ refreshUser, userObject }) => {
  const histoty = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);
  const [newProfilePhoto, setNewProfilePhoto] = useState("");

  const onLogOutClick = () => {
    authService.signOut();
    histoty.push("/");
    refreshUser();
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  //db 데이터 필터링
  const getMySweets = async () => {
    const sweets = await dbService
      .collection("sweets")
      .where("creatorId", "==", userObject.uid)
      .orderBy("createdAt")
      .get();
    console.log(sweets.docs.map((doc) => doc.data()));
  };

  //프로필 이름 변경
  const onSubmit = async (e) => {
    e.preventDefault();

    if (userObject.displayName !== newDisplayName) {
      await userObject.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }

    let profileURL = "";

    if (profileURL !== "") {
      const profileRef = storageService.ref().child(`${userObject.uid}`);
      const res = await profileRef.putString(newProfilePhoto, "data_url");
      profileURL = await res.ref.getDownloadURL();
    }

    const profileObj = {
      displayName: newDisplayName,
      profileURL,
    };

    await dbService.collection("profile").add(profileObj);

    console.log(profileURL);
    //setNewProfilePhoto("");
  };

  const onProfileChange = (e) => {
    const {
      target: { files },
    } = e;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvet) => {
      const {
        currentTarget: { result },
      } = finishedEvet;

      setNewProfilePhoto(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearFile = () => setNewProfilePhoto(null);

  useEffect(() => {
    getMySweets();
  }, []);

  return (
    <div className="container">
      <form className="profileForm" onSubmit={onSubmit}>
        <img
          className="my-face"
          //src={profileObj.profileURL}
          /*           style={{
            backgroundImage: profileURL,
          }} */
        />
        {newProfilePhoto && (
          <div className="factoryForm__attachment">
            <img
              src={newProfilePhoto}
              style={{
                backgroundImage: newProfilePhoto,
              }}
            />

            <div className="factoryForm__clear" onClick={onClearFile}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
        <input
          //value={sweet}
          id="attach-file"
          type="file"
          accept="image/*"
          placeholder="What's on your mind?"
          onChange={onProfileChange}
          maxLength={120}
          style={{
            opacity: 0,
          }}
        />
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Edit photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>

        <input
          className="formInput"
          autoFocus
          placeholder="Display name"
          type="text"
          value={newDisplayName}
          onChange={onChange}
        />
        <input className="formBtn" type="submit" value="Updata Profile" />
      </form>
      <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
