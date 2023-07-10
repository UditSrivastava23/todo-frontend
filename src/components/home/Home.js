import { useEffect, useState } from "react";
import Tab from "../container/Tab";
import { useNavigate } from "react-router-dom";
import "./home.css";
// import EditTab from "../container/EditTab.js"
import Modal from "react-modal";
import SuccessModal from "../modal/suceessModal";
import AuthErrModal from "../modal/authErrModal";
import EditTab from "../container/EditTab";

function Home() {
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
  const [editedTask , setEditedTask] = useState(null)
  // const [viewForm , setViewForm] = useState(false)
  const [message, setMessage] = useState("");
  const [editMode , setEditMode] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [clickedId , setClickedId] = useState('')

  function openModal() {
    setIsOpen(true);
  }

  let panelStyle = {
    width: "90vw",
    padding: "5px",
    margin: "15px",
    marginTop: "50px",
  };

  let fetchData = async () => {
    console.log("My token is token", localStorage.getItem("token"));
    let url = "http://localhost:8000/home";
    let options = {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    let res = await fetch(url, options);
    let data = await res.json();
    console.log("(-_-)", data);
    if (res.status === 401) {
      setMessage(data?.message);
      setFailure(true)
      openModal();
    }
    setTask(data.data);
    console.log('task is set',task)
    // if(task.length === 0){
    //   navigate('/form')
    // }
  };

  function edt(id) {
    setClickedId(id)
    setEditMode(true)
  }

  async function dlt(id) {
    console.log("id is", id);
    let url = `http://localhost:8000/delete/${id}`;
    let options = {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await fetch(url, options);
    let data = await res.json();
    console.log("deleted response", data);
    setMessage(data?.message);
    setSuccess(true)
    openModal();
  }

  // async function update(id){
  //   console.log('In update id is ',id);
  //   console.log('data to send in update is ' , editedTask);
  //   let url = `http://localhost:8000/update/${id}`;
  //   let options = {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     body : new URLSearchParams(editedTask)
  //   };
  //   let res = await fetch(url , options);
  //   let data = await res.json();
  //   console.log(data);
  //   setMessage(data?.message);
  //   setSuccess(true)
  //   openModal();
  //   setEditMode(false)
  // }

  useEffect(() => {
    fetchData();
  },[modalIsOpen]);

  return (
    <div className="mainPanel" style={panelStyle}>
      {console.log("***", task)}
      {task.length===0?navigate('/form'):null}
      {task?.map((e, i) => {
        return (
          <div class="tab_panel">
            <div class="tab">
              {(!editMode || (clickedId !== e?._id)) && <Tab task={e} key={i} id={e?._id} />}
              {editMode && (clickedId === e?._id) && <EditTab task={e} key={i} setEditMode = {setEditMode} openModal= {openModal} setSuccess={setSuccess} setMessage = {setMessage}/>}
            </div>
            {!editMode && <div className="dlt_btn" onClick={() => {dlt(e._id)}}> X </div>}
            {editMode && <div className="dlt_btn" onClick={() => {setEditMode(false)}}> X </div>}
            <div class="edt_btn" >
              {(!editMode || (clickedId !== e?._id)) && <i className="fa-solid fa-pen-to-square" onClick={() => {edt(e._id)}}></i>}
              {/*(editMode && clickedId === e?._id) && <i class="fa-solid fa-check" onClick={()=>{update(e?._id)}}></i>*/}
            </div>
            {/* <div class="dlt_btn" onClick = {dlt(e._id)}>X</div> */}
          </div>
        );
      })}
      <Modal isOpen={modalIsOpen} ariaHideApp={false}>
        {console.log("::::", message)}
        {success && <SuccessModal message={message} close={setIsOpen} />}
        {failure && <AuthErrModal message={message} close={setIsOpen} />}
      </Modal>
    </div>
  );
}

export default Home;
