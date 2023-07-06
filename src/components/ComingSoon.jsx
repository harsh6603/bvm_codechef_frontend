import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'
import image from "../images/coming_soon.png"
import "../css/ComingSoon.css"

export default function ComingSoon() {

    const context = useContext(NoteContext)

    return (
        <div className='commingsoon' style={{ backgroundColor: (context.mode === "white") ? "white" : "#242526" }}>
            <img className='commingsoonImage' src={image} alt="comming soon" />
        </div>
    )
}
