import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import TodoInput from './components/container/TodoInput'
import Home from './components/home/Home'
import Signup from './components/auth/Signup';
import SignIn from './components/auth/signin';
import Logout from './components/auth/logout';
import { useEffect, useState } from 'react';

function App() {

  return(
    <div>
      <div style={{position : 'fixed' , top : '0px' , left : '0px'}}>
      <Navbar />
      </div>
      <Routes>
        <Route exact path='/home' Component={Home}/>
        <Route exact path='/form' Component={TodoInput}/>
        <Route exact path='/signup' Component={Signup}/>
        <Route exact path='/signin' Component={SignIn}/>
        <Route exact path='/logout' Component={Logout}/>
      </Routes>
    </div>
  )
}
export default App;