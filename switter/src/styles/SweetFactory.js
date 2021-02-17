import styled from "styled-components";

const FactoryForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;

  .input {
    width: 400px;
    height: 40px;
    padding: 0px 20px;
    color: black;
    border: 1px solid #04aaff;
    border-radius: 20px;
    font-weight: 500;
    font-size: 12px;
  }
  .arrow {
    position: absolute;
    right: 100px;
    background-color: #04aaff;
    height: 40px;
    width: 40px;
    padding: 10px 0px;
    text-align: center;
    border-radius: 20px;
    color: white;
    outline: none;
    border: none;
  }
`;

const InputLable = styled.label`
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

  img {
    height: 120px;
    width: 120px;
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

export { FactoryForm, InputContainer, InputLable, Attachment };
