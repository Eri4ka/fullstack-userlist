import { ChangeEvent, FC, useState, useRef, useEffect } from 'react';

import { ReactComponent as TrashIc } from '@/assets/images/trash.svg';
import { ReactComponent as EditIc } from '@/assets/images/edit.svg';
import { ReactComponent as CheckIc } from '@/assets/images/check.svg';
import { ReactComponent as CrossIc } from '@/assets/images/cross.svg';
import { IUser } from '@/apptypes/index';
import IconLayuout from '@/components/icon-layout';

import styles from './styles.module.scss';

type Props = {
  data: IUser;
  onDelete: () => void;
  onEdit: (user: IUser) => void;
}

export const User:FC<Props> = ({ data, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(() => data.name);
  const editingFieldRef = useRef<HTMLInputElement>(null);
  
  const handleChangeEditingValue = (event: ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  const handleSetIsEditing = () => {
    setIsEditing(true);
  };
  
  const handleSetIsNotEditing = () => {
    setIsEditing(false);
    setEditingValue(data.name);
  };

  const handleEditUser = () => {
    const isEmpty = !editingValue;
    const isChanged = editingValue !== data.name;
    
    if (isEmpty) {
      setEditingValue(data.name);
    }

    if (isChanged && !isEmpty) {
      onEdit({ id: data.id, name: editingValue }); 
    }

    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      editingFieldRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <li className={styles.user}>
      {isEditing && (
        <input 
          ref={editingFieldRef}
          className={styles.userInput} 
          type="text" 
          value={editingValue} 
          onChange={handleChangeEditingValue} 
        />
      )}
      {!isEditing && <span className={styles.userText}>{data.name}</span>}
      <div className={styles.userIcons}>
        {isEditing && (
          <>
            <IconLayuout icon={<CheckIc />} onClick={handleEditUser} />
            <IconLayuout icon={<CrossIc />} onClick={handleSetIsNotEditing} />
          </>
        )}
        {!isEditing && <IconLayuout icon={<EditIc />} onClick={handleSetIsEditing} />}
        <IconLayuout icon={<TrashIc />} onClick={onDelete} />
      </div>
    </li>
  );
};
