import styles from './tab.module.css'
import useState from 'react';

// function Tab(props){
function Tab({task,id}){
    return(
        <div className={styles.tab}>
            <div className={styles.section1}>
                <div className="title">
                    {task?.title}
                </div>
                <div className="category">
                    {task?.category}
                </div>
            </div>
            <div className={styles.section2}>
                <p>{task?.desc}</p>
            </div>
            <div className={styles.section3}>
                <div className="d_date">
                    {new Date(task?.d_date).toDateString()}
                </div>
            </div>
        </div>
    )
}

export default Tab