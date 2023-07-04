import React from 'react';
import { Link } from 'react-router-dom';
import classes from './navbar.module.css'

function Navbar(){
    let navBarStyle = {
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : '5px 15px 5px 15px',
        width : '98vw',
        backgroundColor : 'rgb(235, 228, 219)',
        // position : 'fixed'
    }
    return(
        <div className="navbar" style={navBarStyle}>
            <div class="appName">
                <h3>TO DO APP</h3>
            </div>
            <div class="menuBtn" style={{...navBarStyle,width:'100px'}}>
                <div>
                    <Link to="/home" className={classes.a}>My Task</Link>
                </div>
                <div>
                    <Link to="/form" className={classes.a}>Form</Link>
                </div>
            </div>
        </div>  
    )
}




export default Navbar