import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload, Progress } from 'antd';
import { getOssInfo } from '../../network/file';
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
const UploadFile = React.forwardRef(({ onUploadSuccess, showButton = true, showProgress = false }, ref) => {
  const [fileUrl,setFileUrl] = useState('')
  const [ossData, setOssData] = useState({})
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  React.useImperativeHandle(ref, () => ({
    handleUpload
  }));

  const queryOssUpload = () => {
    return getOssInfo().then((res) => {
      if(res?.status) {
        const credentials = res.data || {};
        const { AccessKeyId, AccessKeySecret, SecurityToken, bucket, region } = credentials;
        setOssData({
          accessKeyId: AccessKeyId,
          accessKeySecret: AccessKeySecret,
          stsToken: SecurityToken,
          bucket,
          region
        });
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    queryOssUpload()
  }, [])

  const handleUpload = async () => {
    if(fileList.length) {
      const fileName = 'blog-' + new Date().getTime() + '.jpg';
      const file = fileList[0]
      if(file.size > partSize * 100) {
        handleMultipartUpload(fileName, file)
      }else {
        handleNormalUpload(fileName, file)
      }
    }
  }

  const handleNormalUpload = async (fileName, file) => {
    const ossClient = new OSS(ossData);
    await ossClient.put(fileName, file)
    await ossClient.putACL(fileName, 'public-read');
    setFileUrl(`http://oss.yexbxyz.top/` + fileName)
  }

  const handleMultipartUpload = async (fileName, file) => {
    const ossClient = new OSS(ossData);
    await ossClient.multipartUpload(fileName, file, {
      parallel,
      partSize,
      progress: showUploadProgress
    }).then(() => {
      setFileUrl(`http://oss.yexbxyz.top/` + fileName)
    })
  }

  const showUploadProgress = (progress, checkpoint, res) => {
    if(checkpoint) { // 记录已经上传的
      checkpoints[checkpoint.uploadId] = checkpoint
    }
    setUploadProgress(progress.toFixed(2) * 100);
  }

  const resumeUpload = () => {
    const ossClient = new OSS(ossData);
    Object.values(checkpoints).forEach((checkpoint) => {
      const { uploadId, file } = checkpoint;
      ossClient.multipartUpload(uploadId, file, {
        parallel,
        partSize,
        progress: showUploadProgress,
        checkpoint
      }).then(result => {
        delete checkpoints[checkpoint.uploadId];
      }).catch(err => {
        console.log(err);
      });
    });
  }

  useEffect(() => {
    if(fileUrl && onUploadSuccess) {
      console.log('我上传了')
      onUploadSuccess(fileUrl);
    }
  }, [fileUrl, onUploadSuccess]);

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
