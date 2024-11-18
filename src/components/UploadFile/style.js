import styled from "styled-components";
export const UploadWrapper = styled.div`
  .upload-box {
    display: flex;
    .confirm-upload {
      margin-right: 40px;
    }

    /* 设置图片的样式 */
    .ant-upload.ant-upload-select-picture-card img {
      width: 100%; /* 图片宽度与上传框宽度一致 */
      height: 100%; /* 图片高度与上传框高度一致 */
      object-fit: cover; /* 保持图片的宽高比，裁剪超出部分 */
    }
  }
  .upload-progress {
    width: 300px;
  }
`