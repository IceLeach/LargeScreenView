import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './index.less';

interface BoxContainerProps {
  title: string;
  className?: string;
  style?: React.CSSProperties;
  titleClassName?: string;
  titleStyle?: React.CSSProperties;
  renderHeader?: (data: { titleNode: React.ReactNode }) => React.ReactNode;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

const BoxContainer: React.FC<BoxContainerProps> = (props) => {
  const { title, className, style, titleClassName, titleStyle, renderHeader, bodyClassName, bodyStyle, children } = props;

  const titleNode = useMemo(() => (
    <div className={classNames([styles.titleBox, titleClassName])} style={titleStyle}>
      {title}
    </div>
  ), [title, titleClassName, titleStyle]);

  return (
    <div className={classNames([styles.boxContainer, className])} style={style}>
      {renderHeader ? renderHeader({ titleNode }) : titleNode}
      <div className={classNames([styles.body, bodyClassName])} style={bodyStyle}>{children}</div>
    </div>
  );
}

export default BoxContainer;
