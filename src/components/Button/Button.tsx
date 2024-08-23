import React from 'react';
import S from './Button.module.scss';

interface IButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({ children }) => {
  return <button className={S.root}>{children}</button>;
};

export default Button;
