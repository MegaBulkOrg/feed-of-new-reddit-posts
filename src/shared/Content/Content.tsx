import React from 'react';

interface IContentProps {
  children?: React.ReactNode
}

export function Content({children}: IContentProps) {
  return (
    <main className='container'>
      {children}
    </main>
  );
}