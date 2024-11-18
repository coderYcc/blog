import React, { memo, useRef, useState } from 'react'
import { UploadFileWrapper } from './style'
import UploadFile from '@/components/UploadFile'
import { Button } from 'antd'
import { saveFileInfo } from '../../../../network/file'
const UploadFilePage = memo(() => {
  const [fileUrl, setFileUrl] = useState('')
  const normalUploadRef = useRef()
  const multiUploadRef = useRef()
  const handleNormalUpload = (url) => {
    setFileUrl(url)
  }

  const handleMultiUpload = (url) => {
    setFileUrl(url)
    saveFileInfo({
      fileType: 'img',
      fileUrl,
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleUpload = () => {
    if(normalUploadRef.current) {
      normalUploadRef.current.handleUpload()
    }
    if(multiUploadRef.current) {
      multiUploadRef.current.handleUpload()
    }
  }
  return (
    <UploadFileWrapper>
      <div className="normal-upload">
        <div className='upload-type'>普通上传</div>
        <UploadFile 
          ref={normalUploadRef}
          showButton={false} 
          onUploadSuccess={handleNormalUpload}
        ></UploadFile>
      </div>
      <div className="multi-part-upload">
        <div className='upload-type'>分片上传</div>
        <UploadFile
          ref={multiUploadRef}
          showButton={false} 
          showProgress={true} 
          onUploadSuccess={handleMultiUpload}
        >
        </UploadFile>
      </div>
      <Button type='primary' className='upload-button' onClick={handleUpload}>点击上传</Button>
    </UploadFileWrapper>
  )
})

export default UploadFilePage