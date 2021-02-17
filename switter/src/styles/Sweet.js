import styled from "styled-components";

const Sweet = styled.div`
  border: 1px solid #c8c8c8;
  box-shadow: 3px 3px 3px #00000029;
  margin-bottom: 40px;
  background-color: white;
  width: 600px;
  height: 800px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);

  h4 {
    font-size: 14px;
    width: 100%;
    padding: 20px;
  }

  //사진 크기
  .file-img {
    width: 600px;
    height: 600px;
    margin: 5px;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;

  span {
    margin-left: 10px;
    font-size: 15px;
  }

  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }
`;

const FormBtn = styled.input`
  cursor: pointer;
  width: 100%;
  margin: 10px 0;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: #04aaff;
  cursor: pointer;
`;

const CancleBtn = styled.button`
  width: 100%;
  margin: 10px 0;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  background-color: tomato;
`;

const Item = styled.div`
  margin-left: auto;

  span {
    cursor: pointer;
  }

  span:first-child {
    margin-right: 10px;
  }
`;



export { Sweet, Header, FormBtn, CancleBtn, Item, };
