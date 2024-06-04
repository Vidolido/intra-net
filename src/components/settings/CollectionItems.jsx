'use client';
import { memo } from 'react';

const CollectionItems = ({ children }) => {
  // console.log(children, 'THE CHILDREN');
  return <div>{children}</div>;
};

export default memo(CollectionItems);
