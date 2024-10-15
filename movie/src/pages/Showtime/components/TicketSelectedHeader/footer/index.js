import React from 'react';
import styles from './StickyFooter.module.scss'; // Assuming you're using SCSS modules for styling

const StickyFooter = () => {
  return (
    <footer className={styles.stickyFooter}>
      <div className={styles.statusContainer}>
        <div className={styles.statusItem}>
          <div className={`${styles.seatIndicator} ${styles.available}`}></div>
          <span>Available</span>
        </div>
        <div className={styles.statusItem}>
          <div className={`${styles.seatIndicator} ${styles.selected}`}></div>
          <span>Selected</span>
        </div>
        <div className={styles.statusItem}>
          <div className={`${styles.seatIndicator} ${styles.sold}`}></div>
          <span>Sold</span>
        </div>
      </div>
    </footer>
  );
};

export default StickyFooter;
