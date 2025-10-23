import { useState, useEffect, useRef, memo } from 'react';

const LazyImage = memo(({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImgSrc(src); // 开始加载真实图片
          observer.unobserve(entry.target);
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imgSrc}
      alt={alt}
    />
  );
})

export default LazyImage
