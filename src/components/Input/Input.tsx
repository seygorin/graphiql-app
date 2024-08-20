import s from './Input.module.scss';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<IInputProps> = ({ ...rest }) => {
  return <input {...rest} className={s.root} />;
};

export default Input;
