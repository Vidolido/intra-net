'use client';
const ClientComp = ({ children }) => {
  console.log(children, 'CHILDREN');
  return <>{children}</>;
};

export default ClientComp;
