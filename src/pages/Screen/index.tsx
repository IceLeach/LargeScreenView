import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import Icon from '@/components/Icon';
import BoxContainer from '@/components/BoxContainer';
import RadioTabs from '@/components/RadioTabs';
import ThemeSelect from '@/components/ThemeSelect';
import useContentZoom from '@/utils/useContentZoom';
import InfoModal from './InfoModal';
import backgroundFooterImg from '@/assets/backgroundFooter.png';
import exitImg from '@/assets/exit.png';
import styles from './index.less';

import statusImg from './img/status.png';
import pueImg from './img/pue.png';
import energyRImg from './img/energyR.png';
import energyTImg from './img/energyT.png';
import realImg from './img/real.png';
import temImg from './img/tem.png';
import humImg from './img/hum.png';
import roomImg from './img/room.png';
import roomDataImg from './img/roomData.png';
import alarmRImg from './img/alarmR.png';
import alarmSImg from './img/alarmS.png';

const DESIGN_SIZE = {
  width: 1920,
  height: 1080,
}

const roomItems: { x: number; y: number; error?: boolean }[] = [
  { x: 217, y: 99 },
  { x: 165, y: 248 },
  { x: 383, y: 45 },
  { x: 446, y: 131 },
  { x: 516, y: 185 },
  { x: 1001, y: 117 },
  { x: 1096, y: 215 },
  { x: 1167, y: 301 },
];

const Screen: React.FC = () => {
  const [energyActiveKey, setEnergyActiveKey] = useState<string>('1');
  const [temHumActiveKey, setTemHumActiveKey] = useState<string>('1');
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const ref = useRef(null);
  const zoom = useContentZoom(ref, DESIGN_SIZE);

  return (
    <div ref={ref} className={styles.screen}>
      <div className={styles.container} style={{ ...DESIGN_SIZE, transform: `scale(${zoom})` }}>
        <img src={backgroundFooterImg} className={styles.backgroundFooter} />
        <div className={styles.header}>
          <div className={styles.headerLeft}></div>
          <div className={styles.headerCenter}>
            <div className={styles.headerTitle}>浙江省数智地质服务平台</div>
            <div className={styles.headerSubTitle}>机房监测</div>
          </div>
          <div className={styles.headerRight}>
            <img src={exitImg} className={styles.exit} />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyLeft}>
            <BoxContainer title='设备运行状况'>
              <img src={statusImg} style={{ width: '100%' }} />
            </BoxContainer>
            <BoxContainer title='能耗分析'>
              <RadioTabs
                items={[
                  { key: '1', label: '上一小时PUE' },
                  { key: '2', label: '能耗占比' },
                  { key: '3', label: '能耗趋势' },
                ]}
                activeKey={energyActiveKey}
                onChange={key => setEnergyActiveKey(key as string)}
                style={{ marginTop: 16 }}
              />
              {energyActiveKey === '3' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 4, marginTop: 6 }}>
                  <div style={{ fontSize: 14, lineHeight: '18px', color: '#9AE0D3' }}>用电量/kW·h</div>
                  <ThemeSelect
                    size='short'
                    options={[
                      { label: '今日', value: 'day' },
                      { label: '本月', value: 'month' },
                      { label: '本年', value: 'year' },
                    ]}
                    defaultValue='day'
                  />
                </div>
              )}
              <img src={energyActiveKey === '1' ? pueImg : energyActiveKey === '2' ? energyRImg : energyTImg} style={{ width: '100%' }} />
            </BoxContainer>
            <BoxContainer title='温湿度'>
              <RadioTabs
                items={[
                  { key: '1', label: '实时' },
                  { key: '2', label: '温度趋势图' },
                  { key: '3', label: '湿度趋势图' },
                ]}
                activeKey={temHumActiveKey}
                onChange={key => setTemHumActiveKey(key as string)}
                style={{ marginTop: 16 }}
              />
              <img src={temHumActiveKey === '1' ? realImg : temHumActiveKey === '2' ? temImg : humImg} style={{ width: '100%' }} />
            </BoxContainer>
          </div>
          <div className={styles.bodyRight}>
            <div className={styles.bodyRoom}>
              <img src={roomImg} style={{ height: 537 }} />
              <div className={styles.roomItems} style={{ height: 537 }}>
                <img src={roomDataImg} style={{ position: 'absolute', left: 172, top: 0, width: 1061 }} />
                {roomItems.map((item, index) => (
                  <div
                    key={index}
                    className={classNames([styles.roomItem, item.error ? styles.roomItemError : null])}
                    style={{ left: item.x, top: item.y }}
                    onClick={() => setInfoModalVisible(true)}
                  >
                    <Icon type='icon-wenshidu1' className={styles.roomItemIcon} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.bodyBottom}>
              <BoxContainer
                title='实时告警监测'
                renderHeader={({ titleNode }) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {titleNode}
                    <ThemeSelect
                      size='long'
                      options={[
                        { label: '今日', value: 'day' },
                        { label: '本月', value: 'month' },
                        { label: '本年', value: 'year' },
                      ]}
                      defaultValue='day'
                      style={{ marginTop: 6, marginLeft: 17 }}
                    />
                    <ThemeSelect
                      size='long'
                      options={[
                        { label: '未处理', value: '1' },
                        { label: '已处理', value: '2' },
                      ]}
                      defaultValue='1'
                      style={{ marginTop: 6, marginLeft: 'auto' }}
                    />
                  </div>
                )}
                style={{ width: 791 }}
                bodyStyle={{ background: 'transparent' }}
              >
                <img src={alarmRImg} style={{ width: '100%' }} />
              </BoxContainer>
              <BoxContainer title='告警数据统计' style={{ marginLeft: 'auto' }}>
                <img src={alarmSImg} style={{ width: '100%' }} />
              </BoxContainer>
            </div>
          </div>
        </div>
        <InfoModal visible={infoModalVisible} onClose={() => setInfoModalVisible(false)} />
      </div>
    </div>
  );
}

export default Screen;
