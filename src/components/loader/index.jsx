// components/Loaders/CircleLoader.jsx
import React from 'react';
import styled from 'styled-components'; // 也可用普通CSS，这里用styled-components更灵活

// 样式组件（可替换为CSS类）
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${props => props.height || '100px'}; // 自定义高度，默认100px
`;

const CircleSpinner = styled.div`
  width: ${props => props.size || '24px'}; // 自定义大小，默认24px
  height: ${props => props.size || '24px'};
  border: 3px solid ${props => props.color || '#f3f3f3'}; // 浅色边框
  border-top: 3px solid ${props => props.primaryColor || '#007bff'}; // 高亮边框（博客主色调）
  border-radius: 50%;
  animation: spin 1s linear infinite; // 旋转动画

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 加载文本（可选）
const LoaderText = styled.span`
  margin-left: 12px;
  color: ${props => props.textColor || '#666'};
  font-size: 14px;
`;

/**
 * 圆形旋转加载组件
 * @param {string} size - 加载圆大小（如"24px"）
 * @param {string} color - 浅色边框颜色
 * @param {string} primaryColor - 高亮边框颜色（建议用博客主色）
 * @param {string} text - 加载文本（可选）
 * @param {string} height - 容器高度（如"200px"，控制垂直居中区域大小）
 */
const CircleLoader = ({ 
  size = '24px', 
  color = '#f3f3f3', 
  primaryColor = '#007bff', 
  text = '', 
  height = '100px' 
}) => {
  return (
    <LoaderContainer height={height}>
      <CircleSpinner 
        size={size} 
        color={color} 
        primaryColor={primaryColor} 
      />
      {text && <LoaderText textColor={color}>{text}</LoaderText>}
    </LoaderContainer>
  );
};

export default CircleLoader;