import React from 'react';
import { Inspector } from 'react-dev-inspector';

const InspectorWrapper = NODE_ENV === 'development' ? Inspector : React.Fragment;

const DevInspectorWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <InspectorWrapper keys={['control', 'shift', 'q']}>{children}</InspectorWrapper>;
};

export default DevInspectorWrapper;
