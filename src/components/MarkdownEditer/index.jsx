import React, { memo, useState } from 'react';
import { Editor } from '@bytemd/react';
import { EditWrapper } from './style';
import 'bytemd/dist/index.css';
import zh_Hans from 'bytemd/locales/zh_Hans.json';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import frontmatter from '@bytemd/plugin-frontmatter';
import math from '@bytemd/plugin-math';
import mermaid from '@bytemd/plugin-mermaid';
import gemoji from '@bytemd/plugin-gemoji';
import breaks from '@bytemd/plugin-breaks';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import 'highlight.js/styles/monokai-sublime.css';

const plugins: BytemdPlugin[] = [
  gfm(),
  math(),
  breaks(),
  gemoji(),
  mermaid(),
  highlight(),
  mediumZoom(),
  frontmatter(),
];

const MarkdownEditor = memo((props: PropsType) => {
  const [value, setValue] = useState('');

  const onChange = (v) => {
      setValue(v)
  };

  const onUploadImagesHandle = () => {
    
  }

  return (
    <EditWrapper>
      <Editor 
        locale={zh_Hans}
        plugins={plugins}
        value={value} 
        onChange={onChange}
        uploadImages={onUploadImagesHandle}
        {...props.editorProps}
      />
    </EditWrapper>
  );
})

export default MarkdownEditor

