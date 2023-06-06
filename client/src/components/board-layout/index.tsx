import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
}

export const BoardLayout:FC<Props> = ({ children }) => {
  return (
    <div className={styles.boardLayout}>
      {children}
    </div>
  );
};