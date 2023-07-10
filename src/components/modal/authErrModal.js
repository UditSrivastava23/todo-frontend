import React from 'react'
import { useNavigate } from 'react-router-dom';

const AuthErrModal = ({close , message}) => {

  // console.log('AUth Error Modal');


  const navigate = useNavigate()

  function closeModal() {
    close(false);
    navigate('/signin')
  }


  return (
    <>
        <h1>{message}</h1>
        <button onClick={closeModal}>Close</button>
    </>
  )
}

export default AuthErrModal
