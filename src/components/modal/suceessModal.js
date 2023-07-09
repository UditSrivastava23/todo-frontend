import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ close, message ,route}) => {

  const navigate = useNavigate();

  console.log('SUccessModal');

  function closeModal() {
    close(false);
    if(route){
      navigate(`${route}`)
    }
  }

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={closeModal}>OK</button>
    </div>
  );
};

export default SuccessModal;
