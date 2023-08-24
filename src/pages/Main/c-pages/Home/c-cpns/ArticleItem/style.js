import styled from "styled-components";
export const ArticleItemWrapper = styled.div`
  padding: 10px 10px 30px;
  margin-bottom: 10px;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px #ccc;
    background-color: rgba(255, 255, 255, 0.5);
  }
 
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  @keyframes cssnice {
    0% {
      opacity: 0;
      transform: translate3d(-40%, 0, 0);
    }
    50% {
      opacity: 1;
      transform: translate3d(3%, 0, 0);
    }
    65% {
      opacity: 1;
      transform: translate3d(-2.5%, 0, 0);
    }
    80% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    90% {
      opacity: 1;
      transform: translate3d(-1%, 0, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`