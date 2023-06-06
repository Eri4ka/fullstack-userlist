import { useState, FormEvent, ChangeEvent, FC } from 'react';

import { IUser } from '@/apptypes/index';
import { Form } from '@/components/form';

type Props = {
  onCreate: (data: Omit<IUser, 'id'>) => void;
}

export const CreateUser:FC<Props> = ({ onCreate }) => {
  const [fieldValue, setFieldValue] = useState('');

  const handleChangeFieldValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onCreate({ name: fieldValue});
    setFieldValue('');
  };

  return (
    <Form
      value={fieldValue}
      onSubmit={handleSubmit} 
      onChangeFieldValue={handleChangeFieldValue} 
      placeholder='Enter name...'
      submitBtnText='Create'
      isDisabled={!fieldValue}
    />
  );
};