import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload, Progress, message } from 'antd';
import { saveFileInfo } from '../../network/file';
import { UploadWrapper } from './style';
import OSS from 'ali-oss';

const parallel = 4
const partSize = 1024 * 1024
const checkpoints = {}; // 所有分片上传文件的检查点
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const UploadFile = React.forwardRef(({ showButton = true, showProgress = false, ossData = {} }, ref) => {
  const [fileUrl, setFileUrl] = useState('')
  const [fileInfo, setFileInfo] = useState({})
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  React.useImperativeHandle(ref, () => ({
    handleUpload,
    fileList
  }));

  const handleUpload = async () => {
    if(fileList.length) {
      const file = fileList[0]
      const fileType = file.type
      let fileName
      if(fileType === 'image/png') {
        fileName = 'blog-' + new Date().getTime() + '.jpg';
      }else {
        fileName = file.name
      }
      console.log(file.size)
      console.log(partSize)
      if(file.size > partSize * 100) {
        handleMultipartUpload(fileName, file, fileType)
      }else {
        handleNormalUpload(fileName, file, fileType)
      }
    }
  }

  const handleNormalUpload = async (fileName, file, fileType) => {
    const ossClient = new OSS(ossData);
    await ossClient.put(fileName, file)
    await ossClient.putACL(fileName, 'public-read');
    setFileUrl(`http://oss.yexbxyz.top/` + fileName)
    setFileInfo({fileType, fileName})
  }

  const handleMultipartUpload = async (fileName, file, fileType) => {
    const ossClient = new OSS(ossData);
    await ossClient.multipartUpload(fileName, file, {
      parallel,
      partSize,
      progress: showUploadProgress
    }).then(() => {
      setFileUrl(`http://oss.yexbxyz.top/` + fileName)
      setFileInfo({fileType, fileName})
    })
  }

  const showUploadProgress = (progress, checkpoint, res) => {
    if(checkpoint) { // 记录已经上传的
      checkpoints[checkpoint.uploadId] = checkpoint
    }
    console.log(progress)
    setUploadProgress(progress.toFixed(2) * 100);
  }

  // const resumeUpload = () => {
  //   const ossClient = new OSS(ossData);
  //   Object.values(checkpoints).forEach((checkpoint) => {
  //     const { uploadId, file } = checkpoint;
  //     ossClient.multipartUpload(uploadId, file, {
  //       parallel,
  //       partSize,
  //       progress: showUploadProgress,
  //       checkpoint
  //     }).then(result => {
  //       delete checkpoints[checkpoint.uploadId];
  //     }).catch(err => {
  //       console.log(err);
  //     });
  //   });
  // }

  useEffect(() => {
    if(fileUrl) {
      const { fileName, fileType } = fileInfo || {}
      handlefileSave({
        fileUrl, fileName, fileType
      });
    }
  }, [fileUrl, fileInfo]);

  const handlefileSave = (fileInfo) => {
    const { fileUrl, fileType, fileName } = fileInfo || {}
    setFileUrl(fileUrl)
    saveFileInfo({
      fileType,
      fileUrl,
      fileName,
    }).then((res) => {
      message.success('上传成功')
      setFileList([]);
      setImageUrl('');
    }).catch((err) => {
      message.error('上传失败')
    })
  }

  const uploadProps = {
    listType: "picture-card",
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setImageUrl('');
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      if(file.type === 'image/png') {
         getBase64(file, (url) => {
          setImageUrl(url);
        });
      }
      return false;
    },
    fileList,
  };

  return (
    <UploadWrapper>
      <div className='upload-box'>
        {showButton && <Button className='confirm-upload' onClick={handleUpload}>上传</Button>}
        <Upload {...uploadProps}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%',
                overflow: 'hidden'
              }}
            />
          ) : (
            <PlusOutlined />
          )}
        </Upload>
      </div>
      { showProgress && <div className='upload-progress'><Progress percent={uploadProgress} status="active" /></div>}
    </UploadWrapper>
  );
});

export default UploadFile
