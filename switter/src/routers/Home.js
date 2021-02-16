import { dbService } from "../myBase";
import React, { useEffect, useState } from "react";
import Sweet from "../components/Sweet";
import SweetFactory from "../components/SweetFactory";

const Home = ({ userObject }) => {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("sweets") // 어떤 곳에 저장해야할지
      .orderBy("createdAt", "desc") // 등록을 해도 시간차 순서가 쌓이지 않아 시간차순으로 정렬함
      .onSnapshot((snapshot) => {
        //onSnapshot
        //db 에 어떤일이 발생하면 알려줌
        // 무언가를 지우거나, 수정했을때 실행하게 해주는 것
        //실시간으로 업데이트 해줌
        const sweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSweets(sweetArray); // 배열관계는 위에 아이처럼 생김
      });
  }, []);

  return (
    <div className="container">
      <SweetFactory userObject={userObject} />
      <div style={{ marginTop: 30 }}>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObject={sweet} // 글쓴이, 내용, 작성일
            isOwner={sweet.creatorId === userObject.uid} // 내 자신의 글인가?
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
