import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { getOssInfo } from '../../network/file';
import { UploadWrapper } from './style';
import OSS from 'ali-oss';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const UploadFile = ({ value, onUploadSuccess }) => {
  const [fileUrl,setFileUrl] = useState('')
  const [ossData, setOssData] = useState({})
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();

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
      const ossClient = new OSS(ossData);
      await ossClient.put(fileName, fileList[0])
      await ossClient.putACL(fileName, 'public-read');
      setFileUrl(`http://oss.yexbxyz.top/` + fileName)
    }
  }

  useEffect(() => {
    if(fileUrl && onUploadSuccess) {
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
      getBase64(file, (url) => {
        setImageUrl(url);
      });
      return false;
    },
    fileList,
  };

  return (
    <UploadWrapper>
      <Button className='confirm-upload' onClick={handleUpload}>上传</Button>
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
    </UploadWrapper>
  );
};

export default UploadFile
