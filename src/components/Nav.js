import React, {useState, useEffect} from 'react'
import './Nav.css';


function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
       window.addEventListener("scroll", ()=>{
           if(window.scrollY > 100){
                handleShow(true);
           }else{
               handleShow(false);
           }
       });
       return()=>{
           window.removeEventListener("scroll");
       }
    }, [])


    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img 
            src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
            alt="Netflix logo"
            className="nav_logo" 
            />
            <img
            src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" 
            alt="Netflix logo"
            className="nav_avatar" 
            />
        </div>
    )
}

export default Nav
