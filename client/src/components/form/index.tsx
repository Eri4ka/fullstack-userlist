import { FormEvent, ChangeEvent, FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  value: string;
  onSubmit: (event: FormEvent) => void;
  onChangeFieldValue: (event: ChangeEvent<HTMLInputElement>) => void;
  submitBtnText: string;
  placeholder?: string;
  isDisabled?: boolean; 
}

export const Form:FC<Props> = ({ 
  value, 
  onSubmit, 
  onChangeFieldValue, 
  submitBtnText, 
  placeholder,
  isDisabled
}) => {

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input 
        className={styles.formInput} 
        type="text" 
        placeholder={placeholder}
        value={value} 
        onChange={onChangeFieldValue} 
      />
      <button className={styles.formSubmit} type='submit' disabled={isDisabled}>{submitBtnText}</button>
    </form>
  );
};