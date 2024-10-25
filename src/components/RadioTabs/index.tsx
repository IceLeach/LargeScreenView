import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

interface RadioTabsProps {
  items: {
    key: string | number;
    label: React.ReactNode;
  }[];
  activeKey: string | number;
  onChange: (key: string | number) => void;
  className?: string;
  style?: React.CSSProperties;
}

const RadioTabs: React.FC<RadioTabsProps> = (props) => {
  const { items, activeKey, onChange, className, style } = props;

  return (
    <div className={classNames([styles.radioTabs, className])} style={style}>
      {items.map((item, index) => {
        const isStart = index === 0;
        const isEnd = index === items.length - 1;
        const isActive = item.key === activeKey;
        return (
          <div
            key={item.key}
            className={classNames([
              styles.tab,
              isStart ? styles.tabStart : null,
              isEnd ? styles.tabEnd : null,
              isActive ? styles.tabActive : null
            ])}
            onClick={() => {
              if (!isActive) {
                onChange(item.key);
              }
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

export default RadioTabs;
