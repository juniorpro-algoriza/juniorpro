'use client';

import { ReactNode } from 'react';

interface ModalProps {
  children?: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  return <div id='modal' className='h-screen w-screen bg-black fixed inset-0 z-20'>{children}</div>;
};
