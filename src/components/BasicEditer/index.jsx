import React, { useState, useMemo, useCallback } from 'react'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { BasicEditerWrapper } from './style'
import '../../assets/iconfont/iconfont.css'
const BasicEditer = () => {
  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => withReact(createEditor()), [])
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const handleBold = () => {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true, // 判断是否加粗
    })
    Transforms.setNodes( // 根据判断重新设置节点
      editor,
      { bold: match ? false : true }, 
      { match: n => Editor.isBlock(editor, n) }
    )
  }

  const handleItalic = () => {
    const [match] = Editor.nodes(editor, {
      match: n => n.italic === true,
    })
    Transforms.setNodes(
      editor,
      { italic: match ? false : true },
      { match: n => Editor.isBlock(editor, n) }
    )
  }

  const increaseFontSize = () => {
    const [match] = Editor.nodes(editor, {
      match: n => !!n.size,
    })
    if (match) {
      const size = match[0].size + 1
      if (size <= 7) {
        Transforms.setNodes(editor, { size }, { match: n => !!n.size })
      }
    }
  }

  const decreaseFontSize = () => {
    const [match] = Editor.nodes(editor, {
      match: n => !!n.size,
    })
    if (match) {
      const size = match[0].size - 1
      if (size >= 1) {
        Transforms.setNodes(editor, { size }, { match: n => !!n.size })
      }
    }
  }

  // 添加代码片段
  // const handleAddCode = () => {
  //   const [match] = Editor.nodes(editor, {
  //     match: n => n.type === 'code',
  //   })
  //   Transforms.setNodes(
  //     editor,
  //     { type: !!match ? null : 'code' },
  //     { match: n => Editor.isBlock(editor, n) }
  //   )
  // }

  // 添加代码块
  const handleAddCodeBlock = () => {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code-block',
    })
    if(!!match) return
    const codeBlock = {
      type: 'code-block',
      children: [{
        text: '',
        type: 'code-block'
      },{ text: '\u200B' }],
    };
    Transforms.insertNodes(editor, codeBlock)
  }

  // 添加图片
  
  const handleUploadImg = () => {
    alert('暂不支持上传图片')
  };

  return (
    <BasicEditerWrapper>
      <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
        <div className="toolbar">
          <div onClick={handleBold}>B</div>
          <div onClick={handleItalic}>I</div>
          <div onClick={increaseFontSize}>A+</div>
          <div onClick={decreaseFontSize}>A-</div>
          <div className='iconfont icon-chakandaimapianduan' onClick={handleAddCodeBlock}></div>
          <div class="iconfont icon-tupian" onClick={handleUploadImg}></div>
        </div>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </BasicEditerWrapper>
  )
}

// 定义组件判断如何渲染
const Element = ({ attributes, children, element }) => {
  const size = element.size ? `h${element.size}` : null
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'code':
    case 'code-block':
      return <pre {...attributes}>
        <code>{children}</code>
      </pre>
    default:
      return <p {...attributes} className={size}>{children}</p>
  }
}

// 定义组件渲染文本样式
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.type === 'code' || leaf.type === 'code-block') {
    children = <code>{children}</code>
    attributes = { ...attributes, className: 'code-bg' }
  }
  if (leaf.italic) {
    children = <span>{children}</span>
    attributes = { ...attributes, className: 'italic' }
  }

  if (leaf.size) {
    const size = `font-size-${leaf.size}`
    children = <span className={size}>{children}</span>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
        bold: true,
        italic: false,
        size: 2,
      },
    ],
  },
]

export default BasicEditer