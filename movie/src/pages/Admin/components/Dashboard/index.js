import style from './dashboard.module.scss';
import { FaComments, FaUsers, FaShoppingCart, FaVideo, FaRevenue} from 'react-icons/fa'; // Assuming you are using react-icons
import { MdAttachMoney } from "react-icons/md";
function Dashboard() {
    return (
        <section className={style.dashboard}>
            <h1>Welcome, Admin</h1>
            <div className={style.stats}>
                <div className={style.card}>
                    
                <FaVideo className={style.icon} />
                    
                    <h3>Movies</h3>
                    <p>50</p>
                    <div className={style["progress-bar"]}>
                        <div className={style.progress}></div>
                    </div>
                </div>
                <div className={style.card}>
                    <FaShoppingCart className={style.icon} />
                    <h3>Reservations</h3>
                    <p>141</p>
                    <div className={style["progress-bar"]}>
                        <div className={style.progress2}></div>
                    </div>
                </div>
                <div className={style.card}>
                    <MdAttachMoney className={style.icon} />
                    <h3>Revenue</h3>
                    <p>11790$</p>
                    <div className={style["progress-bar"]}>
                        <div className={style.progress3}></div>
                    </div>
                </div>
                <div className={style.card}>
                    <FaUsers className={style.icon} />
                    <h3>Users</h3>
                    <p>358</p>
                    <div className={style["progress-bar"]}>
                        <div className={style.progress4}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
