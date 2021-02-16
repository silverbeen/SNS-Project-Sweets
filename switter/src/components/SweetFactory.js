import React, { useState } from "react";
//랜덤으로 식별자를 정해주는 npm
import { dbService, storageService } from "../myBase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const SweetFactory = ({ userObject }) => {
  const [sweet, setSweet] = useState("");
  const [file, setFile] = useState("");

  const onSubmit = async (e) => {
    if (sweet === "") {
      return;
    }
    e.preventDefault();

    let fileURL = "";

    if (file !== "") {
      const fileRef = storageService
        .ref()
        .child(`${userObject.uid}/${uuidv4()}`);
      const res = await fileRef.putString(file, "data_url");
      fileURL = await res.ref.getDownloadURL();
    }

    const sweetObj = {
      // 어떤 곳에 저장해야할지
      text: sweet,
      //원하는 데이터를 넣을 수 있음
      createdAt: Date.now(),
      creatorId: userObject.uid,
      fileURL,
    };
    await dbService.collection("sweets").add(sweetObj);
    setSweet("");
    setFile("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSweet(value);
  };

  //파일 첨부
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFile(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearFile = () => setFile(null);

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={sweet}
          type="text"
          placeholder="무슨생각을 하나요"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />

        {/* 등록 버튼 */}
      </div>

      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        //value={sweet}
        id="attach-file"
        type="file"
        accept="image/*"
        placeholder="What's on your mind?"
        onChange={onFileChange}
        maxLength={120}
        style={{
          opacity: 0,
        }}
      />

      {/* 파일이 존재한다면 이미지 띄우기  */}
      {file && (
        <div className="factoryForm__attachment">
          <img
            src={file}
            style={{
              backgroundImage: file,
            }}
          />
          <button onClick={onClearFile}>Clear</button>

          <div className="factoryForm__clear" onClick={onClearFile}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default SweetFactory;
