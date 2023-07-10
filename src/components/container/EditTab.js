// import styles from "./tab.module.css";
import styles from './edittab.module.css'
import {useState} from "react";

// function Tab(props){
function EditTab({ task, setUserData , update}) {

  let divStyle ={
    textAlign: 'center',
    marginTop : '90px',
    form : {
      display :'flex',
      flexDirection : 'column',
      width : '50%',
      margin : 'auto',
      input:{
        height : '30px'
      }
    } 
  }

  const [formData , setFormData] = useState({
    title : task?.title,
    desc : task?.desc,
    d_date : task?.d_date,
    category : task?.category
  })

  let handleChange = (e)=>{
    console.log('e.target.name',e.target.name);
    console.log('e.target.value',e.target.value);    
    setFormData((prevValue)=>({
      ...prevValue , [e.target.name]:e.target.value 
    }))
    setUserData(formData)
    console.log('Current State is' , formData);
  }

  let handleSubmit = (e)=>{
    console.log(e);
    e.preventDefault();
    update(task._id);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.tab}>
        <div className={styles.section1}>
          <input type="text" className="title" name="title" value={formData?.title} onChange={handleChange}/>
          <select name="category" id="" style={divStyle.form.input} onChange={handleChange}>
            <option value="Personal">Personal</option>
            <option value="School">School</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={styles.section2}>
          <input type="text"  name='desc' value={formData?.desc} className={styles.desc} onChange={handleChange}/>
        </div>
        <div className={styles.section3}>
          <input type="date" name='d_date' className="d_date" value={new Date(formData?.d_date).toDateString()} onChange={handleChange}/>
        </div>
      </div>
       {/*<button type="submit">Done</button>*/}
    </form>
  );
}

export default EditTab;
