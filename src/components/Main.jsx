import React, { useContext, useEffect } from 'react'
import logo from "../images/CodeChef_BVM_Chapter-logo-2.png"
import "../css/Main.css"
import NoteContext from '../context/NoteContext'
import cppImage from "../images/cppImage.webp"
import javaImage from "../images/java_img.png"
import pythonImage from "../images/python_image.webp"
import jsImage from "../images/javascript_logo.svg"

export default function Main(props) {

  const context = useContext(NoteContext);  

  useEffect(() => {
    props.setActiveTab("home")
  },[])

  return (
    <div id="home" className={`${(context.mode === "white")?"lightThemeSpecial":"darkThemeSpecial"}`}>
        <div className='d-flex justify-content-around main-div'>
            <div className='sub-div2'>
                <img className='images' src={logo} alt="codechef logo"/>
                <img style={{position:"absolute",width:"4%"}} src={cppImage}></img>
                <img style={{position:"absolute",width:"5%",left:"5%"}} src={javaImage}></img>
                <img style={{position:"absolute",width:"5%",left:"5%",top:"65%"}} src={pythonImage}></img>
                <img style={{position:"absolute",width:"5%",top:"65%"}} src={jsImage}></img>
            </div>
            <div className='sub-div1'>
                <h1 className='styleLine1'>BVM Codechef Chapter</h1>
                <h6 className='styleLine2'>A global coding community</h6>
                <a href='https://www.codechef.com/college-chapter/member' target="_blank" className={`${(context.mode === "white")?"joinBtn":"joinDarkBtn"}`}>Join Us</a>
            </div>
        </div>
    </div>
  )
}
