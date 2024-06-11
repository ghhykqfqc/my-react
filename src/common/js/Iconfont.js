import React from 'react';

const Iconfont = ({name, size = '1em', color = '#000', className}) => (
  <i 
    className={`iconfont icon-${name} ${className}`}
    style={{ fontSize: size, color }}
  ></i>
);

export default Iconfont;