import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate();
   
    useEffect(()=>{
        localStorage.clear();
        navigate('/signin')
    })
  return (
    <div>
      <h1>You are logged Out</h1>
    </div>
  )
}

export default Logout
