import React, { useState } from 'react'
import NoteContext from './NoteContext';
import { baseUrl } from "../config";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NoteState = (props) => {

    const [events, setEvents] = useState([])

    const [images, setImages] = useState("")

    let navigate = useNavigate();

    //set event description 
    const [singleEvent,setSingleEvent] = useState("");

    //check for loading
    const [loading, setLoading] = useState(false);

    //set dark or light mode
    const [mode, setMode] = useState("white");

    const changeMode = () => {
        // console.log(mode);
        if (mode === "white")
            setMode("dark");
        else
            setMode("white");
    }

    const getImages = (resultUrl) => {
        // setLoading(true);
        const url = `${baseUrl}/api/event/imageInQuestions/${resultUrl}`

        fetch(url,{
            methos:"GET"
        }).then((res) => {            
            return res.blob();
        }).then((data) => {            
            setImages(URL.createObjectURL(data));
            // setLoading(false);
        })
    }

    const getSingleEvent = (CID) => {
        setLoading(true);
        const url=`${baseUrl}/api/event/readSingleEvent/${CID}`;

        fetch(url,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {        
            if (data.success) {
                // console.log(data);
                let temp=data.message;
                setSingleEvent(temp);
                setLoading(false)
            }
            else {
                toast(data.errors, {
                    position: toast.POSITION.BOTTOM_LEFT
                })
                toast.clearWaitingQueue();
                setLoading(false);
            }
        })
    }

    const getEvents = () => {
        setLoading(true);
        const url = `${baseUrl}/api/event/readEvent`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data);
            let temp = data.message;
            temp = temp.sort((a, b) => {
                const dateAInMillis = (new Date(a.date)).getTime();
                const dateBInMillis = (new Date(b.date)).getTime();

                return dateBInMillis - dateAInMillis;
            })

            setEvents(temp);
            setLoading(false);
        })
    }

    const createEvent = (data) => {
        setLoading(true);
        const url = `${baseUrl}/api/event/createEvent`;

        fetch(url, {
            method: "POST",
            headers: {
                // "Content-Type":"",
                "token": localStorage.getItem("token")
                // "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmNmZTZjMTYwNzI3ZTEyZTg1MmRlNCIsIm5hbWUiOiJIYWlsZWUuU3dhbmlhd3NraTgwIiwiaWF0IjoxNjY4MjMwNTg5fQ.Kcofz9Sv9wi82ZCnB-m722bZfVlodYNPbH1jxDb39Y8"
            },
            body: data,
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.success) {
                // console.log(data);
                getEvents();
                setLoading(false);
            }
            else {
                toast(data.errors, {
                    position: toast.POSITION.BOTTOM_LEFT
                })
                toast.clearWaitingQueue();
                setLoading(false);
            }
        })
    }

    const updateEvent = (data, eventId) => {
        setLoading(true);
        const url = `${baseUrl}/api/event/updateEvent/${eventId}`;

        fetch(url, {
            method: "PATCH",
            headers: {
                // "Content-Type":"application/json",
                "token": localStorage.getItem("token")
                // "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmNmZTZjMTYwNzI3ZTEyZTg1MmRlNCIsIm5hbWUiOiJIYWlsZWUuU3dhbmlhd3NraTgwIiwiaWF0IjoxNjY4MjMwNTg5fQ.Kcofz9Sv9wi82ZCnB-m722bZfVlodYNPbH1jxDb39Y8"                
            },
            body: data
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.success) {
                // console.log(data);
                getEvents();
                setLoading(false);
            }
            else {
                toast(data.errors, {
                    position: toast.POSITION.BOTTOM_LEFT
                })
                toast.clearWaitingQueue();
                setLoading(false);
            }
        })
    }

    const addUser = (userData, first, second, third, fourth) => {
        // const url = (process.env.NODE_ENV === "development")?"http://192.168.154.178:5000/api/user/signup":"/api/user/signup";
        setLoading(true);
        const url = `${baseUrl}/api/user/signup`
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        }).then((res) => {
            return res.json();
        }).then((d) => {
            // console.log(d);
            if (d.success) {
                localStorage.setItem('token', d.token);
                localStorage.setItem("userName", d.name);
                localStorage.setItem("userEmail", d.email);
                localStorage.setItem("type", d.type);
                first.value = second.value = third.value = fourth.value = "";
                setLoading(false);
                navigate("/");
            }
            else {
                toast(d.errors, {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                toast.clearWaitingQueue();
                setLoading(false);
            }
        })
    }

    const loginUser = (loginUserData, first, second) => {
        // const url = (process.env.NODE_ENV === "development")?"http://192.168.154.178:5000/api/user/login":"/api/user/login";
        setLoading(true);
        const url = `${baseUrl}/api/user/login`;

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginUserData)
        }).then((res) => {
            return res.json();
        }).then((d) => {
            // console.log(d);
            if (d.success) {
                first.value = second.value = "";
                localStorage.setItem("token", d.token);
                localStorage.setItem("userName", d.name);
                localStorage.setItem("userEmail", d.email);
                localStorage.setItem("type", d.type);
                setLoading(false)
                navigate("/");
            }
            else {
                toast(d.errors, {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                toast.clearWaitingQueue();
                setLoading(false);
            }
        })
    }

    return (
        // eslint-disable-next-line
        <NoteContext.Provider value={{ events, loading, mode,images, singleEvent, setEvents, setImages, getEvents, createEvent, updateEvent, addUser, loginUser, changeMode, setLoading,getImages,getSingleEvent }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;