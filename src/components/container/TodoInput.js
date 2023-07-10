import React, { useEffect, useState } from 'react'
import Modal from "react-modal";
import SuccessModal from "../modal/suceessModal";
import AuthErrModal from "../modal/authErrModal";
import { useNavigate } from 'react-router-dom';

function TodoInput() {

  const navigate = useNavigate()

  const [formData , setFormData] = useState({
    title : '',
    desc : '',
    d_date : null,
    category : 'Personal'
  })

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [msg , setMsg] = useState('');
  const [isLoggedOut , setIsLoggedOut] = useState(true)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    navigate('/home')
  }

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

  let handleChange = (e)=>{
    // console.log('e.target.name',e.target.name);
    // console.log('e.target.value',e.target.value);
    
    setFormData((prevValue)=>{
      prevValue[e.target.name] = e.target.value
      return prevValue;
    })
    // console.log('Current State is' , formData);

  }

  let fetchData = async ()=>{
    let url = 'http://localhost:8000/add'
    let res = await fetch(url,{
      method : 'POST',
      mode : 'cors',
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
      body : new URLSearchParams(formData)
    });
    // console.log('res',res);
    let data = await res.json();
    // console.log('data',data);
    setMsg(data.message)
  }

  let handleSubmit = (e)=>{
    // console.log(e);
    e.preventDefault();
    fetchData()
    openModal()
  }

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      // console.log('In use Effect ');
      navigate('/signin');
    }
  })
  return (
    <div className="inputForm" style={divStyle}>
      <h1>TO DO Input From</h1>
      <form action="/" method="get" style ={divStyle.form} onSubmit={handleSubmit}>
        <input type="text" name="title" id="" placeholder='Enter Your Tilte' style={divStyle.form.input} onChange={handleChange}/>
        <input type="text" name="desc" id="" style={divStyle.form.input} placeholder='Task Description' onChange={handleChange}/>
        <input type="date" name="d_date" id="" style={divStyle.form.input} onChange={handleChange}/>
        <select name="category" id="" style={divStyle.form.input} onChange={handleChange}>
          <option value="Personal">Personal</option>
          <option value="School">School</option>
          <option value="Other">Other</option>
        </select>
        <button>Add</button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Form Submitted"
        ariaHideApp={false}
      >
        <SuccessModal message={msg} close={setIsOpen} route={'/home'}/>
      </Modal>  
      
    </div>
  )
}

export default TodoInput
