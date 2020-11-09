import React, { useState, useEffect } from 'react';

import { offlineNotification } from './NetworkStatus.module.sass';

const NetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    window.addEventListener('offline', () => setIsOffline(true));
    window.addEventListener('online', () => setIsOffline(false));
  }, []);

  return isOffline ? (
    <div className={offlineNotification}>No Network Connectivity</div>
  ) : null;
};

export default NetworkStatus;
