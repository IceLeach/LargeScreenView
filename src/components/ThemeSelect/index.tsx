import React from 'react';
import { Select, SelectProps } from 'antd';
import classNames from 'classnames';
import Icon from '../Icon';
import styles from './index.less';

type ThemeSelectProps = Omit<SelectProps, 'size'> & {
  size: 'short' | 'long';
};

const ThemeSelect: React.FC<ThemeSelectProps> = (props) => {
  const { className, popupClassName, size, ...restProps } = props;

  return (
    <Select
      className={classNames([styles.themeSelect, size === 'short' ? styles.themeSelectShort : styles.themeSelectLong, className])}
      popupClassName={classNames([styles.themeSelectPopup, popupClassName])}
      suffixIcon={<Icon type='icon-jiantou' className={styles.selectIcon} style={{ pointerEvents: 'none' }} />}
      {...restProps}
    />
  );
}

export default ThemeSelect;
