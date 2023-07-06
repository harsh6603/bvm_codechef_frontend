//This component display single card of an event

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';
import "../css/Event.css"
import {baseUrl} from  "../config";

export default function Event(props) {

    const context = useContext(NoteContext)

    const { event, deleteEvent, updateAndSetEvent } = props;

    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const modify = (d) => {
        let result = new Date(d);
        return result.getDate() + " " + Months[result.getMonth()] + " " + result.getFullYear();
    }

    let navigate = useNavigate();

    const ShowQuestions = (event) => {
        let currentDate = Date.now();
        let contestDate = new Date(new Date(new Date(event.date).toDateString()+" "+event.endingTime).getTime() + 45*60000);        
        navigate(`/solutions/${event._id}`)             
    }    

    // console.log(new Date(new Date(event.date).toDateString()+" "+event.endingTime))
    // console.log(new Date(new Date(new Date(event.date).toDateString()+" "+event.endingTime).getTime() + 45*60000));
    // console.log((event.date+" "+event.endingTime))

    return (
        <div>
            <div className={`card`} style={{backgroundColor:(context.mode === "white")?"white":"#404040",color:(context.mode === "white")?"black":"white"}}>
                <div className="card-container">
                    <div className="card-front">
                        {
                            (new Date(new Date(event.date).toDateString()+" "+event.startingTime) > Date.now()) &&
                            <p className='upcomingEvent'>Upcomming Event</p>
                        }
                        <center><img className="card-img" src={`${baseUrl}/api/event/image/${event.image}`} alt="Rome" /></center>
                        <div className="card-content">
                            <center>
                                <h5 className="card-header" style={{backgroundColor:(context.mode === "white")?"white":"#404040"}}>{event.name}</h5>
                            </center>
                            <p className="card-text">
                                <strong><i className="far fa-calendar-alt"></i> </strong> : {modify(event.date)}
                            </p>
                            <p className="card-text">
                                <strong><i className="fa-regular fa-clock"></i> </strong>: {((Number(event.startingTime.slice(0, 2))) > 11) ? (event.startingTime.slice(0,2)==12)? (event.startingTime + " PM") :(event.startingTime.slice(0,2)-12+":"+ event.startingTime.slice(3) + " PM") : (event.startingTime + " AM")} onwards
                            </p>
                            <p className="card-text">
                                <strong><i className="fa-regular fa-hourglass-half"></i> </strong>: {event.duration} hours
                            </p>
                        </div>
                        <button className="card-btn">More <span>&rarr;</span></button>

                    </div>
                    <div className="card-back">
                        <center>
                            <h5 className="disc">{event.name}</h5>
                            {
                                (import.meta.env.VITE_CHECK === localStorage.getItem("type")) &&
                                <div className='icons d-flex justify-content-between'>
                                    <p><i className="fa-solid fa-trash" onClick={(e) => { deleteEvent(event); e.stopPropagation(); }}></i></p>
                                    <p><i className="fa-regular fa-pen-to-square" onClick={(e) => { updateAndSetEvent(event); e.stopPropagation(); }}></i></p>
                                </div>
                            }
                        </center>
                        <pre className="card-text-back">
                            {event.description}
                        </pre>                                          
                        <button className={`card-btn-back`} onClick={() => ShowQuestions(event)}>View solution</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
