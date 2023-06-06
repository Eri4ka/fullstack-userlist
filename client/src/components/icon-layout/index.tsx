import { FC, ReactNode } from 'react';
import cl from 'classnames';

import styles from './styles.module.scss';

export enum IconSize {
  m = 'iconLayout_m'
}

type Props = {
  icon: ReactNode;
  size?: IconSize;
  onClick?: () => void;
}

const IconLayuout:FC<Props> = ({ icon, size = IconSize.m, onClick }) => {
  return (
    <span className={cl(styles.iconLayout, styles[size])} onClick={onClick}>
      {icon}
    </span>
  );
};

export default IconLayuout;