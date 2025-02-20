import React, { memo, useState, useEffect } from 'react'
import { FileListWrapper } from './style'
import { Table, Space, message, Tooltip } from 'antd'
import { queryFileList } from '../../../../network/file'
import { dateFormat } from '../../../../utils'

const columns = [
  {
    title: '文件名称',
    dataIndex: 'fileName',
    key: 'fileName',
  },
  {
    title: '预览地址',
    dataIndex: 'fileUrl',
    key: 'fileUrl',
    width: 200,
    render: (text) => (
      <Tooltip placement="topLeft" title={text}>
        <div
          style={{
            width: '200px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          }}
        >
          {text}
        </div>
      </Tooltip>
    ),
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    key: 'fileType',
  },
  {
    title: '上传时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    render: (text) => dateFormat(text),
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>下载</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const FileList = memo(() => {
  const [fileInfoList, setFileInfoList] = useState([])
  useEffect(() => {
    queryFileList().then((res) => {
      if(res?.data?.rows?.length) {
        setFileInfoList(res.data.rows)
      }
    }).catch(() => {
      message.error('文件列表获取失败，请稍后重试')
    })
  }, [])
  return (
    <FileListWrapper>
      <Table dataSource={fileInfoList} columns={columns} />;
    </FileListWrapper>
  )
})

export default FileList