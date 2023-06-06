import { FC } from 'react';

import { IUser } from '@/apptypes/index';
import { User } from '@/components/user';

import styles from './styles.module.scss';

type Props = {
  list: IUser[];
  onDeleteUser: (userId: IUser['id']) => void;
  onEditUser: (user: IUser) => void;
}

export const UsersList:FC<Props> = ({ list, onDeleteUser, onEditUser }) => {
  return (
    <ul className={styles.usersList}>
      {list.map((user) => (
        <User key={user.id} data={user} onDelete={() => onDeleteUser(user.id)} onEdit={onEditUser} />
      ))}
    </ul>
  );
};
