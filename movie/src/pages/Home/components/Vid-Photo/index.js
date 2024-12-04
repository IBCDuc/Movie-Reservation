import styles from './vidphoto.module.scss'

function Vid() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.grid1}>
                <h2>Videos and photos</h2>
                <img src='http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_30.jpg'/>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h3>10 Cloverfield Lane</h3>
                    </div>
                    <p>A young woman wakes up after a terrible accident to find that she’s… locked in a cellar with a doomsday prepper,… who insists that he saved her life and that the world outside is uninhabitable following an apocalyptic catastrophe. Uncertain what to believe, the woman soon….</p>
                </div>
            </div>
            <div className={styles.grid2}>
                <div className={styles.row1}>
                    <img src="https://i.ibb.co/JzxTJSr/img-60.jpg" />
                    <img src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_58.jpg" />
                    <img src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_57.jpg" />
                </div>
                <div className={styles.row2}>
                    <img src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_55.jpg" />
                    <img src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_54.jpg" />
                    <img src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_53.jpg" />
                </div>
                <div className={styles.row3}>
                    <img src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_52.jpg" />
                    <img src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_58.jpg" />
                    <img src="https://i.ibb.co/JzxTJSr/img-60.jpg" />
                </div>
            </div>
        </div>
    )
}

export default Vid;