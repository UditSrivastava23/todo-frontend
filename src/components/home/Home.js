import { useEffect, useState } from "react";
import Tab from "../container/Tab";
import { useNavigate } from "react-router-dom";
import "./home.css";
// import EditTab from "../container/EditTab.js"
import Modal from "react-modal";
import SuccessModal from "../modal/suceessModal";
import AuthErrModal from "../modal/authErrModal";

function Home() {
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
  // const [viewForm , setViewForm] = useState(false)
  const [message, setMessage] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

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
  };

  function edt(id) {
    let newArr = task.filter((ele) => {
      if (ele._id !== id) {
        return ele;
      }
      return null;
    });
    console.log("this is newArr", newArr);
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

  useEffect(() => {
    fetchData();
  },[modalIsOpen]);

  return (
    <div className="mainPanel" style={panelStyle}>
      {console.log("***", task)}
      {task?.map((e, i) => {
        return (
          <div class="tab_panel">
            <div class="tab">
              <Tab task={e} key={i} id={e?._id} />
              {/* {viewFrom && <EditTab task={e} key={i} id={e._id}/>} */}
            </div>
            <div
              class="dlt_btn"
              onClick={() => {
                dlt(e._id);
              }}
            >
              X
            </div>
            <div
              class="edt_btn"
              onClick={() => {
                edt(e._id);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
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
