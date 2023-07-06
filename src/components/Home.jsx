//This component display cards of an events

import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
import Event from './Event';
import "../css/Home.css"
// import LoadingBar from 'react-top-loading-bar';
// import loading_icon from "../images/Loading_icon.gif"
import Loading from './Loading';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ScrollToTop from './scrollToTop';

export default function Home(props) {

    //state for top loading bar
    // const [progress, setProgress] = useState(0)    

    const check = import.meta.env.VITE_CHECK;

    const context = useContext(NoteContext);

    const fileReference = useRef(null);

    const resultRef = useRef(null);

    const fileRefUpdate = useRef(null);

    const resultRefUpdate = useRef(null);

    //state for storing content of event which you want to update
    const [wantToUpdateEvent, setWantToUpdateEvent] = useState({
        editEventId: "",
        editEventName: "",
        editEventDuration: "",
        editEventStartingTime: "",
        editEventEndingTime: "",
        editEventDate: new Date(),
        editEventDescription: "",
    })

    const modify = (d) => {
        let result = new Date(d);
        return result.getFullYear() + '-' + ('0' + (result.getMonth() + 1)).slice(-2) + '-' + ('0' + result.getDate()).slice(-2);
    }

    useEffect(() => {
        // setProgress(50);
        context.getEvents();
        props.setActiveTab("event")
        // setProgress(100);    
        // eslint-disable-next-line
    }, [])

    const addEvent = () => {
        addEventModalRef.current.click();
    }    

    //update and set event deatils in modal
    const updateAndSetEvent = (updateEventDetails) => {
        // console.log(updateEventDetails);
        setWantToUpdateEvent({
            editEventId: updateEventDetails._id,
            editEventName: updateEventDetails.name,
            editEventDuration: updateEventDetails.duration,
            editEventStartingTime: updateEventDetails.startingTime,
            editEventEndingTime: updateEventDetails.endingTime,
            editEventDate: new Date(updateEventDetails.date),
            editEventDescription: updateEventDetails.description
        })
        // console.log(wantToUpdateEvent)
        updateEventModalRef.current.click();
    }

    //assign new value in input feild of update modal
    const assignNewValue = (e) => {
        setWantToUpdateEvent({ ...wantToUpdateEvent, [e.target.name]: e.target.value })
    }

    //reference of create event
    const addEventModalRef = useRef(null);

    //reference of create event modal close button
    const closeAddEventModal = useRef(null);

    //reference of update event
    const updateEventModalRef = useRef(null);

    //reference of update event modal close button
    const closeUpdateEventModal = useRef(null);

    const clearAddEventFeilds = () => {
        const eventImage = document.getElementById("eventImage");
        const name = document.getElementById("eventName");
        const duration = document.getElementById("eventDuration");
        const startingTime = document.getElementById("eventStartingTime");
        const endingTime = document.getElementById("eventEndingTime");
        const date = document.getElementById("eventDate");
        const description = document.getElementById("eventDescription");
        const files2 = document.getElementById("files2");
        eventImage.value = files2.value = name.value = duration.value = startingTime.value = endingTime.value = date.value = date.value = description.value = "";
    }

    const errorMessage = new Map([
        ["eventImage","image"],
        ["eventName","name"],
        ["eventDuration","duration"],
        ["eventStartingTime","starting time"],
        ["eventEndingTime","ending time"],
        ["eventDate","date"],
        ["eventDescription","description"]
    ])

    const checkInput = (e) => {

        if(e.target.value === "")
        {
            e.target.parentElement.childNodes[2].innerHTML = `Please enter ${errorMessage.get(e.target.name)} of an event.`
            e.target.parentElement.childNodes[2].style.visibility="visible"
        }
        else
        {
            e.target.parentElement.childNodes[2].style.visibility="hidden"
        }
    }

    const checkImage = (e) => {
        if(e.target.value=== "")
        {
            e.target.parentElement.childNodes[2].innerHTML = `Please enter ${errorMessage.get(e.target.name)} of an event.`
            e.target.parentElement.childNodes[2].style.visibility="visible"
        }
        else
        {
            e.target.parentElement.childNodes[2].style.visibility="hidden"
        }
    }

    const validationForAddEvent = (eventImage,name,duration,startingTime,endingTime,date,description,files2) => {

        let check=true;

        if(eventImage.value === "")
        {
            eventImage.parentElement.childNodes[2].innerHTML = "Please give image of an event."
            eventImage.parentElement.childNodes[2].style.visibility="visible"            
            check=false;
        }
        if(name.value === "")
        {
            name.parentElement.childNodes[2].innerHTML = "Please enter name of an event."
            name.parentElement.childNodes[2].style.visibility="visible"            
            check=false;
        }
        if(duration.value === "")
        {
            duration.parentElement.childNodes[2].innerHTML = "Please duration of an event."
            duration.parentElement.childNodes[2].style.visibility="visible"            
            check=false;
        }
        if(startingTime.value === "")
        {
            startingTime.parentElement.childNodes[2].innerHTML = "Please starting time of an event."
            startingTime.parentElement.childNodes[2].style.visibility="visible"            
            check=false;
        }
        if(endingTime.value === "")
        {
            endingTime.parentElement.childNodes[2].innerHTML = "Please enter ending time of an event."
            endingTime.parentElement.childNodes[2].style.visibility="visible"            
            check=false;
        }
        if(date.value === "")
        {
            date.parentElement.childNodes[2].innerHTML = "Please enter date of an event."
            date.parentElement.childNodes[2].style.visibility="visible"            
            check=false;
        }
        if(description.value === "")
        {
            description.parentElement.childNodes[2].innerHTML = "Please enter description of an event."
            description.parentElement.childNodes[2].style.visibility="visible"            
            check=false;
        }        

        return check;
    }

    const handleSubmit = () => {
        
        const eventImage = document.getElementById("eventImage");
        const name = document.getElementById("eventName");
        const duration = document.getElementById("eventDuration");
        const startingTime = document.getElementById("eventStartingTime");
        const endingTime = document.getElementById("eventEndingTime");
        const date = document.getElementById("eventDate");
        const description = document.getElementById("eventDescription");
        const files2 = document.getElementById("files2");

        let result = validationForAddEvent(eventImage,name,duration,startingTime,endingTime,date,description,files2);
        if(result)
        {
            closeAddEventModal.current.click();
            let fd = new FormData();
            fd.append("files", fileReference.current.files[0]);
            fd.append("name", name.value)
            fd.append("duration", duration.value)
            fd.append("startingTime", startingTime.value)
            fd.append("endingTime", endingTime.value)
            fd.append("date", date.value)
            fd.append("description", description.value)
            fd.append("files1", resultRef.current.files[0])
                    
            // const data = {
            //     image:fileRef.current.files[0],
            //     name: name.value,
            //     duration: duration.value,
            //     startingTime: startingTime.value,
            //     endingTime: endingTime.value,
            //     date: date.value,
            //     description: description.value
            // }        
            
            files2.value = eventImage.value = name.value = duration.value = startingTime.value = endingTime.value = date.value = date.value = description.value = "";            
            context.createEvent(fd);        
        }
    }

    const handleUpdate = () => {
        closeUpdateEventModal.current.click()
        const editName = document.getElementById("editEventName");
        const editDuration = document.getElementById("editEventDuration");
        const editStartingTime = document.getElementById("editEventStartingTime");
        const editEndingTime = document.getElementById("editEventEndingTime");
        const editDate = document.getElementById("editEventDate");
        const editDescription = document.getElementById("editEventDescription");
        const files2Update = document.getElementById("files2Update");
        const filesUpdate = document.getElementById("filesUpdate");    

        let fd = new FormData();
        fd.append("files", fileRefUpdate.current.files[0]);
        fd.append("name", editName.value)
        fd.append("duration", editDuration.value)
        fd.append("startingTime", editStartingTime.value)
        fd.append("endingTime", editEndingTime.value)
        fd.append("date", editDate.value)
        fd.append("description", editDescription.value)
        fd.append("files1", resultRefUpdate.current.files[0])

        // const updateData = {
        //     name: editName.value,
        //     duration: editDuration.value,
        //     startingTime: editStartingTime.value,
        //     endingTime: editEndingTime.value,
        //     date: editDate.value,
        //     description: editDescription.value
        // }
        files2Update.value = filesUpdate.value = editName.value = editDuration.value = editStartingTime.value = editEndingTime.value = editDate.value = editDescription.value = "";
        context.updateEvent(fd, wantToUpdateEvent.editEventId);
    }

    //update note and make delete=true
    const deleteEvent = (deleteEventDetails) => {
        // console.log(deleteEventDetails);
        let fd = new FormData();
        fd.append("deleted",true);        
        context.updateEvent(fd, deleteEventDetails._id)
    }

    //update event modal
    const [showUpdateEventModal, setShowUpdateEventModal] = useState(false);

    const handleShowUpdateModal = () => {
        window.history.pushState({}, "", "#open-modal");
        setShowUpdateEventModal(true);
    }

    const handleCloseUpdateModal = () => {
        window.history.replaceState({}, "", window.location.pathname);
        setShowUpdateEventModal(false);
    }

    const handleHideUpdateModal = () => {
        history.back();
    }

    useEffect(() => {
        function handlePopState(event) {
            if (showUpdateEventModal)
                setShowUpdateEventModal(false);
        }

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        }
    }, [showUpdateEventModal])

    //add event
    const [showAddEventModal, setShowAddEventModal] = useState(false);

    const handleShowAddModal = () => {
        window.history.pushState({}, "", "#open-modal");
        setShowAddEventModal(true);
    }

    const handleCloseAddModal = () => {
        window.history.replaceState({}, "", window.location.pathname);
        setShowAddEventModal(false);        
    }

    const handleHideAddEventModal = () => {
        history.back();
    }

    useEffect(() => {
        function handlePopState(event) {
            if (showAddEventModal)
                setShowAddEventModal(false);
        }

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        }
    }, [showAddEventModal])


    return (
        <>
            <ScrollToTop />
            <div className={`${(context.mode === "white") ? "lightThemeSpecial" : "darkThemeSpecial"}`}>
                <div className={`container setHome`}>
                    {
                        (context.loading) &&
                        <Loading />
                    }
                    {/* <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} /> */}
                    {
                        (!context.loading) &&
                        <h1>Events</h1>
                    }
                    <div className='row py-3'>
                        {
                            (!context.loading) &&
                            context.events.map((event) => {
                                return <div key={event._id} className='col-md-3'>
                                    <Event event={event} deleteEvent={deleteEvent} updateAndSetEvent={updateAndSetEvent} />
                                </div>
                            })
                        }
                    </div>

                    {/* //update event modal */}
                    <Button ref={updateEventModalRef} className='d-none' variant="primary" onClick={handleShowUpdateModal}>
                        Launch static backdrop modal
                    </Button>

                    <Modal
                        show={showUpdateEventModal}
                        // onHide={handleCloseUpdateModal}
                        // backdrop="static"
                        keyboard={false}
                        animation={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Update Event</Modal.Title>
                            <Button ref={closeUpdateEventModal} className='modalBtn' variant="white" onClick={handleHideUpdateModal}>&times;</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="both">
                                    <label htmlFor='eventImage'>Event Image</label>
                                    <input ref={fileRefUpdate} className='inputFeild' type="file" id="filesUpdate" name="filesUpdate" placeholder='Event Image' />
                                </div>
                                <div className="both">
                                    <label htmlFor='eventName'>Event Name</label>
                                    <input className='inputFeild' type="text" id="editEventName" value={wantToUpdateEvent.editEventName} name="editEventName" placeholder='Event Name' onInput={assignNewValue} />
                                </div>
                                <div className="both">
                                    <label htmlFor='eventDuration'>Event Duration</label>
                                    <input className='inputFeild' type="time" id="editEventDuration" value={wantToUpdateEvent.editEventDuration} name="editEventDuration" placeholder='Event Durauion' onInput={assignNewValue} />
                                </div>
                                <div className="both">
                                    <label htmlFor='eventStartingTime'>Event Starting Time</label>
                                    <input className='inputFeild' type="time" id="editEventStartingTime" value={wantToUpdateEvent.editEventStartingTime} name="editEventStartingTime" placeholder='Event Starting Time' onInput={assignNewValue} />
                                </div>
                                <div className="both">
                                    <label htmlFor='eventEndingTime'>Event Ending Time</label>
                                    <input className='inputFeild' type="time" id="editEventEndingTime" value={wantToUpdateEvent.editEventEndingTime} name="editEventEndingTime" placeholder='Event Ending Time' onInput={assignNewValue} />
                                </div>
                                <div className="both">
                                    <label htmlFor='eventDate'>Event Date</label>
                                    <input className='inputFeild' type="date" id="editEventDate" value={modify(wantToUpdateEvent.editEventDate)} name="editEventDate" placeholder='Event Date' onInput={assignNewValue} />
                                </div>
                                <div className="both">
                                    <label htmlFor='eventDescription'>Event Description</label>
                                    {/* <input className='inputFeild' type="description" id="editEventDescription" value={wantToUpdateEvent.editEventDescription} name="editEventDescription" placeholder='Event Description' onInput={assignNewValue} /> */}
                                    <textarea rows={5} style={{ outline: "none", border: "1px solid #cec9c9" }} className='inputFeild' value={wantToUpdateEvent.editEventDescription} id="editEventDescription" name="editEventDescription" placeholder='Event Description' onInput={assignNewValue}></textarea>
                                </div>
                                <div className="both">
                                    <label htmlFor='eventImage'>Event result Image</label>
                                    <input ref={resultRefUpdate} accept="image/*" className='inputFeild' type="file" id="files2Update" name="files2" placeholder='Event result Image' />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={"dark"} onClick={handleUpdate}>Update Event</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* //add event modal */}
                    <Button ref={addEventModalRef} className='d-none' variant="primary" onClick={handleShowAddModal}>
                        Launch static backdrop modal
                    </Button>

                    <Modal
                        show={showAddEventModal}
                        // onHide={handleCloseAddModal}
                        // backdrop="static"
                        keyboard={false}
                        animation={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Add Event</Modal.Title>
                            <Button ref={closeAddEventModal} className='modalBtn' variant="white" onClick={handleHideAddEventModal}>&times;</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="both">
                                    <label htmlFor='eventImage'>Event Image</label>
                                    <input ref={fileReference} className='inputFeild' type="file" id="eventImage" name="eventImage" placeholder='Event Image' onChange={checkImage} />                                   
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='eventName'>Event Name</label>
                                    <input className='inputFeild' type="text" id="eventName" name="eventName" placeholder='Event Name' onInput={checkInput}/>
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='eventDuration'>Event Duration</label>
                                    <input className='inputFeild' type="time" id="eventDuration" name="eventDuration" placeholder='Event Durauion' onInput={checkInput}/>
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='eventStartingTime'>Event Starting Time</label>
                                    <input className='inputFeild' type="time" id="eventStartingTime" name="eventStartingTime" placeholder='Event Starting Time' onInput={checkInput}/>
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='eventEndingTime'>Event Ending Time</label>
                                    <input className='inputFeild' type="time" id="eventEndingTime" name="eventEndingTime" placeholder='Event Ending Time' onInput={checkInput}/>
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='eventDate'>Event Date</label>
                                    <input className='inputFeild' type="date" id="eventDate" name="eventDate" placeholder='Event Date' onInput={checkInput}/>
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='eventDescription'>Event Description</label>
                                    {/* <input className='inputFeild' type="description" id="eventDescription" name="eventDescription" placeholder='Event Description' /> */}
                                    <textarea rows={5} style={{ outline: "none", border: "1px solid #cec9c9" }} className='inputFeild' id="eventDescription" name="eventDescription" placeholder='Event Description' onInput={checkInput}></textarea>
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='files2'>Event result Image</label>
                                    <input ref={resultRef} accept="image/*" className='inputFeild' type="file" id="files2" name="files2" placeholder='Event result Image' />
                                    <p className='errorMessage'></p>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={"dark"} onClick={handleSubmit}>Add Event</Button>
                        </Modal.Footer>
                    </Modal>
                    {
                        (check === localStorage.getItem("type") && !context.loading) &&
                        <button type="button" style={{ backgroundColor: "gainsboro", color: "black" }} className={`btn mb-3`} onClick={addEvent}>Add Event</button>
                    }
                </div>
                <ToastContainer limit={1} toastStyle={{ backgroundColor: (context.mode === "white") ? "black" : "lightslategray", color: "white" }} icon={false} hideProgressBar closeButton={false} />
            </div>
            {<Footer />}
        </>
    )
}
