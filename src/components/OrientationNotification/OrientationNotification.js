import React from 'react';

import styles from './OrientationNotification.module.sass';
import LogoAlt from '../../vectors/LogoAlt';
import RotateIcon from '../../vectors/RotateIcon';

const OrientationNotification = () => (
  <section className={styles.container}>
    <div className={styles.content}>
      <div className={styles.logo}>
        <LogoAlt />
      </div>
      <h3>ROTATE PHONE</h3>
      <p>Hey there, Please rotate your phone to use the whot.ng application.</p>

      <div className={styles.rotateIcon}>
        <RotateIcon />
      </div>
    </div>
  </section>
);

export default OrientationNotification;
