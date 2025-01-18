import { FacebookFilled, TwitterSquareFilled, InstagramFilled } from '@ant-design/icons';
import styles from './footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.content1}>
                    <img src="https://i.imghippo.com/files/grryP1727434394.png" alt="Logo" />
                    <p>Experience the magic of cinema with us. Book your tickets now for the latest movies in premium theaters.</p>
                    <p>&copy; 2024 TKMovie. All rights reserved.</p>
                </div>
                <div className={styles.quickLinks}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Movies</a></li>
                        <li><a href="#">Cinemas</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className={styles.socialConnect}>
                    <h3>Connect With Us</h3>
                    <ul className={styles.socials}>
                        <li>
                            <a href="#"><FacebookFilled /> Facebook</a>
                        </li>
                        <li>
                            <a href="#"><TwitterSquareFilled /> Twitter</a>
                        </li>
                        <li>
                            <a href="#"><InstagramFilled /> Instagram</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;