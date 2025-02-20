import styled from 'styled-components'
export const UploadFileWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  .normal-upload {
    flex: 1;
    .upload-type {
      font-size: 16px;
      line-height: 2;
      font-weight: 600;
      margin-right: 40px;
    }
    .upload-button {
      margin-top: 22px;
    }
  }
  .multi-part-upload {
    flex: 1;
    .upload-type {
      font-size: 16px;
      line-height: 2;
      font-weight: 600;
      margin-right: 40px;
    }
  }
`