import styles from "./tab.module.css";
import useState from "react";

// function Tab(props){
function EditTab({ task, id }) {
  return (
    <form className={styles.tab}>
      <div className={styles.tab}>
        <div className={styles.section1}>
          <input type="text" value = {task?.title} className="title"/>
          <input type="text" className="category" value = {task?.category}/>
        </div>
        <div className={styles.section2}>
          <input type="text">{task?.desc}</input>
        </div>
        <div className={styles.section3}>
          <input type="date" className="d_date" value = {new Date(task?.d_date).toDateString()}/>
        </div>
      </div>
    </form>
  );
}

export default EditTab;
