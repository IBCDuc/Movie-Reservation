import React from 'react';
import styles from './StickyFooter.module.scss';

const StickyFooter = ({ selectedSeats, totalPrice, formatPrice, onBookSeats, isBooking  }) => {
  return (
    <footer className={styles.stickyFooter}>
      {selectedSeats?.length > 0 ? (
        <div className={styles.checkoutContainer}>
          <div className={styles.priceInfo}>
            <span style={{color: '#fff'}}>{selectedSeats.length} Seats Selected</span>
            <span className={styles.totalPrice} style={{color: '#fff'}}>{formatPrice(totalPrice)}</span>
          </div>
          <button 
            className={styles.proceedButton}
            onClick={onBookSeats}
            disabled={isBooking}
          >
             {isBooking ? 'Processing...' : `Book Seats - ${formatPrice(totalPrice)}`}
          </button>
        </div>
      ) : (
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
      )}
    </footer>
  );
};

export default StickyFooter;