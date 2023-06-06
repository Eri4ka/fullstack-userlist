import { useState, FormEvent, ChangeEvent, FC } from 'react';

import { Form } from '@/components/form';

type Props = {
  onSearch: (q: string) => void;
}

export const SearchUser:FC<Props> = ({ onSearch }) => {
  const [fieldValue, setFieldValue] = useState('');

  const handleChangeFieldValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(fieldValue);
  };

  return (
    <Form
      value={fieldValue}
      onSubmit={handleSubmit} 
      onChangeFieldValue={handleChangeFieldValue} 
      placeholder='Enter name...'
      submitBtnText='Search'
    />
  );
};