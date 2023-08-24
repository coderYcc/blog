import styled from "styled-components";
export const LoginWrapper = styled.div`
  .formContainer{
    position: fixed;
    background-color: rgba(0, 0, 0, 0.7);
    width: 500px;
    height: 300px;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding: 20px;
    z-index:100;
  }
  .login-title{
    text-align: center;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    color:white;
  }
  .form-button {
    display: flex;
    justify-content: space-around;
  }
`