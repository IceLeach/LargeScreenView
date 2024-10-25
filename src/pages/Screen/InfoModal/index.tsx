import React from 'react';
import styles from './index.less';

import img from './img.png';

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = (props) => {
  const { visible, onClose } = props;

  return (
    <div className={styles.infoModal} style={{ display: visible ? 'flex' : 'none' }}>
      <div className={styles.modalBody}>
        <img src={img} style={{ width: '100%' }} />
        <div className={styles.closeHolder} onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoModal;
