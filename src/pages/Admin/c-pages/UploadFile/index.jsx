import React, { memo, useRef, useState, useEffect } from 'react'
import { UploadFileWrapper } from './style'
import UploadFile from '@/components/UploadFile'
import { Button, message } from 'antd'
import { getOssInfo } from '../../../../network/file';

const UploadFilePage = memo(() => {
  const [ossData, setOssData] = useState({})
  const normalUploadRef = useRef()
  const multiUploadRef = useRef()  

  const handleUpload = (type) => {
    if(type === 'normal' && normalUploadRef.current) {
      if(!normalUploadRef.current.fileList.length) {
        message.error('请先选择文件')
        return
      }
      normalUploadRef.current.handleUpload()
    }else if(type === 'multi' && multiUploadRef.current) {
      if(!multiUploadRef.current.fileList.length) {
        message.error('请先选择文件')
        return
      }
      multiUploadRef.current.handleUpload()
    }
  }

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
      message.error('获取文件上传token失败')
    })
  }

  useEffect(() => {
    queryOssUpload()
  }, [])

  return (
    <UploadFileWrapper>
      <div className="normal-upload">
        <div className='upload-type'>普通上传</div>
        <UploadFile 
          ref={normalUploadRef}
          ossData={ossData}
          showButton={false} 
        ></UploadFile>
        <Button type='primary' className='upload-button' onClick={() => handleUpload('normal')}>点击上传</Button>
      </div>
      <div className="multi-part-upload">
        <div className='upload-type'>分片上传(仅测试使用)</div>
        <UploadFile
          ref={multiUploadRef}
          ossData={ossData}
          showButton={false} 
          showProgress={true} 
        >
        </UploadFile>
        <Button type='primary' className='upload-button' onClick={() => handleUpload('multi')}>点击上传</Button>
      </div>
    </UploadFileWrapper>
  )
})

export default UploadFilePage