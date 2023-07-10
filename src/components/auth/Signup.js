import React, { useState } from "react";
import Modal from "react-modal";
import SuccessModal from "../modal/suceessModal";
import AuthErrModal from "../modal/authErrModal";

const Signup = () => {

  const [message, setMessage] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

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
  const [value, setValue] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  let signUp = async () => {
    let url = "http://localhost:8000/sign-up";
    let options = {
      method: "POST",
      mode: "cors",
      body: new URLSearchParams(value),
    };
    let res = await fetch(url, options);
    let data = await res.json();
    // console.log({data});
    setMessage(data?.message);
    if (res.status !==200) {
      setMessage(data?.message);
      setFailure(true)
    }else{
      setSuccess(true)
    }
  };

  let handleChange = (e) => {
    // console.log("e.target.name", e.target.name);
    // console.log("e.target.value", e.target.value);

    setValue((prevValue) => {
      value[e.target.name] = e.target.value;
      return prevValue;
    });
    // console.log("Current state is ", value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    signUp();
    openModal();
  };

  return (
    <div className="inputForm" style={divStyle}>
      <h1>Sign Up</h1>
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
        <input
          type="password"
          name="confirm_password"
          id=""
          style={divStyle.form.input}
          placeholder="reEnter password"
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        {/* console.log("::::", message)*/}
        {success && <SuccessModal close={closeModal} message={message} route={'/signin'}/>}
        {failure && <AuthErrModal close={closeModal} message={message} />}
      </Modal>
    </div>
  );
};

export default Signup;
