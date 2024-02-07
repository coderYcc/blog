import React, { memo } from 'react'
// import BasicEditer from '../../components/BasicEditer'
import MarkdownEditor from '../../components/MarkdownEditer'
const Edit = memo(() => {
  return (
    <div>
      {/* <BasicEditer/> */}
      <MarkdownEditor/>
    </div>
  )
})

export default Edit