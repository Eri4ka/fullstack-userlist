import { useState, useEffect } from 'react'

import UserService from '@/api/services/user.service';
import { IUser } from '@/apptypes/index';
import { UsersList } from '@/components/users-list';
import { CreateUser } from '@/components/create-user';
import { BoardLayout } from '@/components/board-layout';
import { SearchUser } from '@/components/search-user';

import styles from './styles.module.scss';


function App() {
  const [userList, setUserList] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const responseData = await UserService.getAllUsers();
 
      if (responseData.status === 'success') {
        setUserList(responseData.data);
      }
    };
    fetchAllUsers();
  }, []);

  const onCreateUser = async (data: Omit<IUser, 'id'>) => {
    const responseData = await UserService.createUser(data);

    if (responseData.status === 'success') {
      setUserList((current) => [...current, responseData.data]);
    }
  };

  const onDeleteUser = async (userId: IUser['id']) => {
    const responseData = await UserService.deleteUser(userId);

    if (responseData.status === 'success')  {
      setUserList((current) => current.filter(user => user.id !== userId));
    }
  };

  const onEditUser = async (editedUser: IUser) => {
    const responseData = await UserService.editUser(editedUser);

    if (responseData.status === 'success') {
      setUserList((current) => current.map(user => {
        if (user.id === editedUser.id) {
          return editedUser;
        }
        return user;
      }));
    }
  };

  const onSearchUser = async (q: string) => {
    const responseData = await UserService.searchUser(q);

    if (responseData.status === 'success') {
      setUserList(responseData.data);
    }
  }

  return (
    <div className={styles.app}>
      <BoardLayout>
        <SearchUser onSearch={onSearchUser}/>
      </BoardLayout>
      <BoardLayout>
        <CreateUser onCreate={onCreateUser} />
        <UsersList list={userList} onDeleteUser={onDeleteUser} onEditUser={onEditUser} />
      </BoardLayout>
    </div>
  )
}

export default App
