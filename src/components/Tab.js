import styles from './tab.module.css'

function Tab(){
    return(
        <div className={styles.tab}>
            <div className={styles.section1}>
                <div className="title">
                    CSS
                </div>
                <div className="category">
                    Personal
                </div>
            </div>
            <div className={styles.section2}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi rerum alias nisi quod eum aliquid consequatur id consectetur. Labore voluptate fuga sed debitis ullam quo aut laboriosam reprehenderit soluta! Distinctio quisquam sunt accusantium repellendus, blanditiis quibusdam asperiores natus sapiente id?</p>
            </div>
            <div className={styles.section3}>
                <div className="d_date">
                    12-06-2023
                </div>
            </div>
        </div>
    )
}

export default Tab