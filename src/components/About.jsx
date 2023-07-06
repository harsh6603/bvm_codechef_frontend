import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/NoteContext';
import "../css/About.css";
import logo from '../images/CodeChef_BVM_Chapter-logo-2.png';

export default function About() {

    const text = ``

    const context = useContext(NoteContext)

    return (
        <div id="about" className={`${(context.mode === "white")?"lightThemeSpecial":"darkThemeSpecial"}`}>
            <h1 className='styleAbout'>About Us</h1>
            <div className="small_message">Once you will know us &#128515; , you will fall in love with us &#128519;</div>

            <div className="container">
                <div className="row rowForAbout d-flex justify-content-between">
                    <div className="col setContent">
                        <div className="questions">Q.What is Codechef?</div>
                        CodeChef was started in 2009 as an educational initiative for the programming community by Directi,
                        an
                        Indian software
                        products company. Today, CodeChef is one of the world’s largest and popular global competitive
                        programming platforms
                        preferred by student & professional programmers.
                        <br /><br />

                        <div className="questions">Q.Why we started this chapter?</div>
                        We want every student from our college to indulge in coding competition and to create a
                        coding environment at our college.
                        <br /> <br />

                    </div>
                    <div className="col">
                        <div className="community_heading">Community with Benefits &#128540;</div><br /><br />


                        <div className="community_info">
                            <i className="fa fa-check sm_icon" style={{ color: "rgb(36, 112, 12)" }}></i> &nbsp;&nbsp;Regular codingcontest<br />
                            <i className="fa fa-check sm_icon" style={{ color: "rgb(36, 112, 12)" }}></i> &nbsp;&nbsp;Mentorship Program<br />
                            <i className="fa fa-check sm_icon" style={{ color: "rgb(36, 112, 12)" }}></i> &nbsp;&nbsp;Doubt Solving after everycontest<br />
                            <i className="fa fa-check sm_icon" style={{ color: "rgb(36, 112, 12)" }}></i> &nbsp;&nbsp;Video Editorial fordifferenttopic<br />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
