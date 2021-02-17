import React, { useState } from "react";
import { dbService, storageService } from "../myBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import * as S from "../styles/Sweet";

const Sweet = ({ sweetObject, isOwner }) => {
  const [editing, setEditing] = useState(false);
  //수정된 글 input 값 수정 가능
  const [newSweet, setNewSweet] = useState(sweetObject.text);

  //삭제
  const onDeleteClick = async () => {
    const ok = window.confirm("이 게시글을 삭제하시겠습니까>");
    console.log(ok);
    if (ok) {
      await dbService.doc(`sweets/${sweetObject.id}`).delete();
      await storageService.refFromURL(sweetObject.fileURL).delete();
    }
  };

  const onEditClick = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`sweets/${sweetObject.id}`).update({
      text: newSweet,
    });
    //더이상 수정모드가 아니기에 false 설정
    setEditing(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewSweet(value);
  };

  return (
    <S.Sweet>
      {editing ? ( // 너가 만약 수정중이라면 ?? 폼을 보여줘
        <>
          <form className="container" onSubmit={onSubmit}>
            <input
              className="formInput"
              autoFocus
              onChange={onChange}
              type="text"
              placeholder="수정할 게시글을 써주세요"
              value={newSweet}
              required
            />
            <S.FormBtn type="submit" value="수정하기" className="formBtn" />
          </form>
          <S.CancleBtn onClick={onEditClick} className="formBtn cancleBtn">
            Cancle
          </S.CancleBtn>
        </>
      ) : (
        // 아니라면
        <>
          <S.Header>
            <img className="profile-img" src="/" />
            <span>사용자이름</span>
            {isOwner && ( // 이게 내 게시글이라면 버튼을 뜨게해
              <S.Item className="sweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={onEditClick}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </S.Item>
            )}
          </S.Header>
          {sweetObject.fileURL && (
            <img className="file-img" src={sweetObject.fileURL} />
          )}
          <h4>{sweetObject.text}</h4>
        </>
      )}
    </S.Sweet>
  );
};

export default Sweet;
