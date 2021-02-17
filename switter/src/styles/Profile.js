import styled from "styled-components";

const ProfileForm = styled.form`
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  padding-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .my-face {
    width: 250px;
    height: 250px;
    border: 1px solid red;
  }
`;

const ProfileImgEdit = styled.label`
  color: #04aaff;
  cursor: pointer;

  span {
    margin-right: 10px;
    font-size: 12px;
  }
`;

const Attachment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 200px;
    width: 200px;
    border-radius: 20px;
  }
  .clear {
    color: #04aaff;
    cursor: pointer;
    text-align: center;

    > span {
      margin-right: 10px;
      font-size: 12px;
    }
  }
`;

const FormBtn = styled.input`
  cursor: pointer;
  width: 100%;
  margin: 20px 0;
  padding: 12px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: #04aaff;
  cursor: pointer;
  box-shadow: 0px 3px 3px #00000029;
`;

const CancleBtn = styled.button`
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  text-align: center;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  background-color: tomato;
  box-shadow: 0px 3px 3px #00000029;
`;

export { ProfileForm, ProfileImgEdit, Attachment, FormBtn, CancleBtn };
