import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from '../context/NoteContext';
import "../css/Navbar.css"

export default function Navbar(props) {

    const context = useContext(NoteContext)

    const closeNavbarForMobile = useRef(null);

    const [navbarStatus,setNavbarStatus] = useState(false);    

    const changeClass = () => {
        const myModalForNavbar = document.getElementById("myModalForNavbar");

        if(navbarStatus===false)
        {
            myModalForNavbar.classList.add("modalForNavbar");
            setNavbarStatus(true);
        }
        else
        {
            myModalForNavbar.classList.remove("modalForNavbar");
            setNavbarStatus(false);
        }
    }

    window.onscroll = () => {
        const navbar = document.querySelector('.nav-fixed');
        if (context.mode === "white") {
            if (window.scrollY > 100) {
                navbar.classList.add('nav-active');
            } else {
                navbar.classList.remove('nav-active');
            }
        }
        else {
            if (window.scrollY > 100) {
                navbar.classList.add('nav-active-dark');
            } else {
                navbar.classList.remove('nav-active-dark');
            }
        }
    };

    let userName = localStorage.getItem("userName");
    let userEmail = localStorage.getItem("userEmail");
    let firstLetterOfUserName;

    if (localStorage.getItem("token")) {
        firstLetterOfUserName = userName.charAt(0).toLowerCase();
    }

    const closeNavbar = useRef();

    const media = window.matchMedia("(max-width:1000px)");

    let location = useLocation();
    
    useEffect(() => {
        // console.log(location.pathname);
    }, [location])

    const navi = useNavigate();

    const anotherLink = () => {
        const myModalForNavbar = document.getElementById("myModalForNavbar");   

        myModalForNavbar.classList.remove("modalForNavbar");
        setNavbarStatus(false);
        closeNavbarForMobile.current.click();
    }

    const redirect = () => {
        navi("/")
        const myModalForNavbar = document.getElementById("myModalForNavbar");   

        if (media.matches)
        {
            myModalForNavbar.classList.remove("modalForNavbar");
            setNavbarStatus(false);
            closeNavbarForMobile.current.click();
        }
    }

    //display profile when user is loged in
    const displayProfile = (e) => {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    window.onclick = function (e) {
        const modal = document.getElementById("myModal");
        const myModalForNavbar = document.getElementById("myModalForNavbar");
        const signoutBtn = document.getElementById("signoutBtn");
        // const myModalForList = document.getElementById("myModalForList");

        //when user click on signout button
        if (signoutBtn) {
            signoutBtn.onclick = function () {
                modal.style.display = "none";
            }
        }
        if (e.target === modal) {
            modal.style.display = "none";
        }
        if(e.target === myModalForNavbar)
        {
            myModalForNavbar.classList.remove("modalForNavbar");
            setNavbarStatus(false);
            closeNavbarForMobile.current.click();
        }
    }

    const handleSignOut = () => {
        // console.log("Inside logout")
        localStorage.clear();
        navi("/");
    }

    //State for dark and light mode cicle icon
    const [circle, setCircle] = useState("left");
    const shiftCircle = () => {
        if (circle === "right")
            setCircle("left");
        else
            setCircle("right");
        context.changeMode();
    }    

    const currentTab = () => {
        // console.log(location.hash)
        // console.log(location.pathname.split("/")[0].charAt(0).toUpperCase()+location.pathname.split("/")[0].slice(1))
        // location.pathname.split("/")[1].charAt(0).toUpperCase()+location.pathname.split("/")[1].slice(1)
        
        if(location.pathname === "/")
        {
            // return location.hash.slice(1).charAt(0).toUpperCase() + location.hash.slice(2)
            return props.activeTab.slice(0,1).toUpperCase() + props.activeTab.slice(1)
        }
        else if(location.pathname.split("/")[1] === "solutions")
        {
            return "Events"
        }
        else
        {
            return location.pathname.split("/")[1].charAt(0).toUpperCase()+location.pathname.split("/")[1].slice(1);
        }
    }        

    return (
        <div>
            {
                (!media.matches)
                    ?

                    //navbar for desktop
                    <nav style={{ zIndex: "2", borderBottom: "1px solid gainsboro" }} className={`navbar navbar-expand-lg navbar-${(context.mode === "white") ? "light" : "dark"} bg-${(context.mode === "white") ? "white" : "dark"} fixed-top nav-fixed`}>
                        <div className="container-fluid">
                            <button ref={closeNavbar} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="mainBoxForSwitch">
                                <div className='subBoxForSwitch'>
                                    <svg className='sunIcon' data-name="Layer 1" height="18px" width="18px" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title /><circle className="cls-1" cx="32" cy="32" r="17" /><line className="cls-2" x1="32" x2="32" y1="5" y2="11" /><line className="cls-2" x1="32" x2="32" y1="53" y2="59" /><line className="cls-2" x1="59" x2="53" y1="32" y2="32" /><line className="cls-2" x1="11" x2="5" y1="32" y2="32" /><line className="cls-2" x1="51.09" x2="46.85" y1="12.91" y2="17.15" /><line className="cls-2" x1="17.15" x2="12.91" y1="46.85" y2="51.09" /><line className="cls-2" x1="51.09" x2="46.85" y1="51.09" y2="46.85" /><line className="cls-2" x1="17.15" x2="12.91" y1="17.15" y2="12.91" /></svg>
                                    <svg className='moonIcon' data-name="Layer 1" height="18px" width="18px" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44.54,41.47A23,23,0,0,1,24.49,11.73,1,1,0,0,0,23,10.59,23,23,0,1,0,54.41,42a1,1,0,0,0-1.14-1.47A23.06,23.06,0,0,1,44.54,41.47Z" /></svg>
                                    <i style={{ cursor: "pointer", color: (context.mode === "white") ? "#c1c1c1" : "#c1c1c1" }} id="switchCircle" className={`fa-solid fa-circle ${(circle === "right") ? "circleRight" : "circleLeft"}`} onClick={shiftCircle}></i>
                                </div>
                            </div>
                            {
                                (localStorage.getItem("token"))
                                    &&
                                    <div /*ref={refOfProfile}*/ id="clickedProfile" className="borderSet2 " style={{ cursor: "pointer" }} onClick={displayProfile}>
                                        <i id="clickedProfile" style={{ cursor: "pointer", color: "white", fontWeight: "bolder", fontSize: "16px" }} className={`fa-solid fa-${(firstLetterOfUserName) && firstLetterOfUserName.toLowerCase()}`} aria-hidden="true"></i>
                                    </div>
                                    // :
                                    // <div className="borderSet1">
                                    //     {/* <Link style={{ cursor: "pointer" }} to="/login"><i className="fa fa-user-circle" aria-hidden="true"></i></Link> */}
                                    //     <Link className="navbar-brand notForDesktop" to="/login"><i className="fa fa-user-circle"></i></Link>
                                    // </div>
                            }
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {/* <li className="nav-item">
                                            <Link className={`nav-link ${(location.pathname === "/" && location.hash === "#main") ? "active" : ""}`} aria-current="page" to="/">Main</Link>
                                        </li> */}

                                    <li className='nav-item' onClick={redirect}>
                                        <a className={`nav-link ${((location.pathname === "/" && ((location.hash === "#home" || location.hash === "")) && props.activeTab === "home" ) || (location.hash !== "#home" && props.activeTab === "home")) ? "active" : ""}`} href="#home">Home</a>
                                    </li>

                                    <li className='nav-item' onClick={redirect}>
                                        <a className={`nav-link ${( (location.hash === "#about" && props.activeTab === "about") || (location.hash !== "#about" && props.activeTab === "about")) ? "active" : ""}`} href="#about">About</a>
                                    </li>

                                    <li className='nav-item' onClick={redirect}>
                                        <a className={`nav-link ${( (location.hash === "#team" && props.activeTab === "team") || (location.hash !== "#team" &&  props.activeTab === "team")) ? "active" : ""}`} href='#team'>Team</a>
                                    </li>

                                    <li className="nav-item" onClick={() => { (media.matches) && closeNavbar.current.click() }}>
                                        <Link className={`nav-link ${(location.pathname === "/events" || location.pathname.slice(0,10) === "/solutions") && props.activeTab === "event" ? "active" : ""}`} aria-current="page" to="/events">Events</Link>
                                    </li>

                                    {/* <li className="nav-item" onClick={() => { (media.matches) && closeNavbar.current.click() }}>
                                            <Link className={`nav-link ${(location.pathname === "/about") ? "active" : ""}`} to="/solutions">Solutions</Link>
                                        </li> */}

                                    <li className='nav-item' onClick={redirect}>
                                        <a className={`nav-link ${((location.hash === "#contact" && props.activeTab === "contact") || (location.hash !== "#contact" && props.activeTab === "contact")) ? "active" : ""}`} href='#contact'>Contact</a>
                                    </li>

                                    {/* <li className="nav-item">
                                            <Link className={`nav-link ${(location.pathname === "/about") ? "active" : ""}`} to="/#about">About</Link>
                                        </li> */}
                                </ul>
                                {/* <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form> */}
                            </div>
                        </div>
                    </nav>

                    :
                    //navbar for mobile
                    <div id="myModalForNavbar" className=''>
                        <nav style={{ zIndex: "2", borderBottom: "1px solid gainsboro" }} className={`navbar navbar-expand-lg navbar-${(context.mode === "white") ? "light" : "dark"} bg-${(context.mode === "white") ? "white" : "dark"} fixed-top nav-fixed`}>
                            <div className="container-fluid">
                                <button ref={closeNavbarForMobile} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation" onClick={changeClass}>
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <p style={{position:"absolute",left:"65px",top:"10px",fontSize:"20px",color:(context.mode === "white")?"black":"white"}}>{currentTab()}</p>
                                <div className={'mainBoxForSwitch'}>
                                    <div className='subBoxForSwitch'>
                                        <svg className='sunIcon' data-name="Layer 1" height="18px" width="18px" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title /><circle className="cls-1" cx="32" cy="32" r="17" /><line className="cls-2" x1="32" x2="32" y1="5" y2="11" /><line className="cls-2" x1="32" x2="32" y1="53" y2="59" /><line className="cls-2" x1="59" x2="53" y1="32" y2="32" /><line className="cls-2" x1="11" x2="5" y1="32" y2="32" /><line className="cls-2" x1="51.09" x2="46.85" y1="12.91" y2="17.15" /><line className="cls-2" x1="17.15" x2="12.91" y1="46.85" y2="51.09" /><line className="cls-2" x1="51.09" x2="46.85" y1="51.09" y2="46.85" /><line className="cls-2" x1="17.15" x2="12.91" y1="17.15" y2="12.91" /></svg>
                                        <svg className='moonIcon' data-name="Layer 1" height="18px" width="18px" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44.54,41.47A23,23,0,0,1,24.49,11.73,1,1,0,0,0,23,10.59,23,23,0,1,0,54.41,42a1,1,0,0,0-1.14-1.47A23.06,23.06,0,0,1,44.54,41.47Z" /></svg>
                                        <i style={{ cursor: "pointer", color: (context.mode === "white") ? "#c1c1c1" : "#c1c1c1" }} id="switchCircle" className={`fa-solid fa-circle ${(circle === "right") ? "circleRight" : "circleLeft"}`} onClick={shiftCircle}></i>
                                    </div>
                                </div>
                                {
                                    (localStorage.getItem("token"))
                                        &&
                                        <div id="clickedProfile" className="borderSet2 " style={{ cursor: "pointer" }} onClick={displayProfile}>
                                            <i id="clickedProfile" style={{ cursor: "pointer", color: "white", fontWeight: "bolder", fontSize: "16px" }} className={`fa-solid fa-${(firstLetterOfUserName) && firstLetterOfUserName.toLowerCase()}`} aria-hidden="true"></i>
                                        </div>
                                        // :
                                        // <div className="borderSet1">
                                        //     {/* <Link style={{ cursor: "pointer" }} to="/login"><i className="fa fa-user-circle" aria-hidden="true"></i></Link> */}
                                        //     <Link className="navbar-brand notForDesktop" to="/login"><i className="fa fa-user-circle"></i></Link>
                                        // </div>
                                }
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        {/* <li className="nav-item">
                                            <Link className={`nav-link ${(location.pathname === "/" && location.hash === "#main") ? "active" : ""}`} aria-current="page" to="/">Main</Link>
                                        </li> */}

                                        <li className='nav-item' onClick={redirect}>
                                            <a className={`nav-link ${(location.pathname === "/" && (location.hash === "#home" || location.hash === "")) ? "active" : ""}`} href="#home">Home</a>
                                        </li>

                                        <li className='nav-item' onClick={redirect}>
                                            <a className={`nav-link ${(location.hash === "#about") ? "active" : ""}`} href="#about">About</a>
                                        </li>

                                        <li className='nav-item' onClick={redirect}>
                                            <a className={`nav-link ${(location.hash === "#team") ? "active" : ""}`} href='#team'>Team</a>
                                        </li>

                                        <li className="nav-item" onClick={() => { (media.matches) && anotherLink() }}>
                                            <Link className={`nav-link ${(location.pathname === "/events" || location.pathname.slice(0,10) === "/solutions") ? "active" : ""}`} aria-current="page" to="/events">Events</Link>
                                        </li>

                                        {/* <li className="nav-item" onClick={() => { (media.matches) && closeNavbar.current.click() }}>
                                            <Link className={`nav-link ${(location.pathname === "/about") ? "active" : ""}`} to="/solutions">Solutions</Link>
                                        </li> */}

                                        <li className='nav-item' onClick={redirect}>
                                            <a className={`nav-link ${(location.hash === "#contact") ? "active" : ""}`} href='#contact'>Contact</a>
                                        </li>

                                        {/* <li className="nav-item">
                                            <Link className={`nav-link ${(location.pathname === "/about") ? "active" : ""}`} to="/#about">About</Link>
                                        </li> */}
                                    </ul>
                                    {/* <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form> */}
                                </div>
                            </div>
                        </nav>
                    </div>
            }

            {/* profile button  */}
            <div id="myModal" className="modalForProfile">
                <div id="profile" className="profileDivShow">
                    <div className='iconUnderProfile'>
                        <i style={{ color: "white", fontWeight: "bolder", fontSize: "50px" }} className={`fa-solid fa-${firstLetterOfUserName}`} aria-hidden="true"></i>
                    </div>
                    <div>
                        <h5>{userName}</h5>
                        <h6 style={{ color: "rgb(117, 109, 109)" }}>{userEmail}</h6>
                    </div>
                    <hr />
                    <div>
                        <button id="signoutBtn" className='signOutBtn' onClick={handleSignOut}>Sign out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
