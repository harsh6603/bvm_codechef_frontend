import React, { useContext } from 'react'
import loading_icon from "../images/Loading_icon.gif"
import loading_black from "../images/loading_black.gif"
import "../css/Loading.css"
import NoteContext from '../context/NoteContext';

export default function Loading() {

    const media = window.matchMedia("(max-width:500px)");

    const context = useContext(NoteContext);

    return (
        // <div>
        //     <img src={(context.mode === "white")?loading_icon:loading_black} alt="loading" className='loader' style={{ width:(media.matches)?"45%":"15%", height: "100%" }} />
        // </div>
        <div className='centerLoading'>
            <div className={`${(context.mode === "white")?"loader":"loader-dark"}`}></div>
        </div>
    )
}
