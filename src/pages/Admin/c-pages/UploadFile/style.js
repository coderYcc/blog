import styled from 'styled-components'
export const UploadFileWrapper = styled.div`
  height: 100%;
  .normal-upload {
    height: 25%;
    display: flex;
    .upload-type {
      font-size: 16px;
      line-height: 2;
      font-weight: 600;
      margin-right: 40px;
    }
  }
  .multi-part-upload {
    height: 35%;
    display: flex;
    .upload-type {
      font-size: 16px;
      line-height: 2;
      font-weight: 600;
      margin-right: 40px;
    }
  }
  .upload-button {
    margin-left: 104px;
  }
`