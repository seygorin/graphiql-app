import React from 'react';
import s from './Button.module.scss';

interface IButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({ children }) => {
  return <button className={s.root}>{children}</button>;
};

export default Button;
