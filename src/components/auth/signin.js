import React, { useState } from "react";
import Modal from "react-modal";
import SuccessModal from "../modal/suceessModal";
import AuthErrModal from "../modal/authErrModal";

let divStyle = {
  textAlign: "center",
  marginTop: "90px",
  form: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    margin: "auto",
    input: {
      height: "30px",
    },
  },
};

const SignIn = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState("");
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  let handleChange = (e) => {
    console.log("e.target.name", e.target.name);
    console.log("e.target.value", e.target.value);

    setValue((prevValue) => {
      value[e.target.name] = e.target.value;
      return prevValue;
    });
    console.log("Current state is ", value);
  };

  let createSession = async () => {
    console.log('hahahahaha');
    let url = "http://localhost:8000/create-session";
    let options = {
      method: "POST",
      mode: "cors",
      body: new URLSearchParams(value),
    };
    let res = await fetch(url, options);
    let data = await res.json();
    console.log('123',{data});
    setMessage(data.message);
    if(!!data?.data?.token){
        localStorage.setItem('token',data?.data.token)
        setSuccess(true)
    }else{
      setFailure(true)
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    createSession();
    openModal();
  };

  return (
    <div className="inputForm" style={divStyle}>
      <h1>Sign IN</h1>
      <form
        action="/"
        method="get"
        style={divStyle.form}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          id=""
          placeholder="Enter Your EMail"
          style={divStyle.form.input}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id=""
          style={divStyle.form.input}
          placeholder="Enter password"
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        {console.log("::::", message)}
        {success && <SuccessModal close={closeModal} message={message} route={'/home'}/>}
        {failure && <AuthErrModal close={closeModal} message={message} />}
      </Modal>
    </div>
  );
};

export default SignIn;