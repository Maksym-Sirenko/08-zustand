import React from 'react';

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

const NotesLayout = ({ children, modal }: Props) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default NotesLayout;
