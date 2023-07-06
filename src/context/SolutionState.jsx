import React, { useState } from 'react'
import SolutionContext from './SolutionContext'
import { baseUrl } from "../config";
import { toast } from 'react-toastify';

const SolutionState = (props) => {

    //state for storing questions of particular contest
    const [questions, setQuestions] = useState([]);

    //state for storing one question of particular contest
    const [oneQuestion, setOneQuestion] = useState([]);

    //check for loading
    const [loading, setLoading] = useState(false);

    /**
     * 
     * @param {solution details} data 
     * @param {contest id} CID 
     */
    const createSolution = (data, CID) => {
        const url = `${baseUrl}/api/solution/createSolution/${CID}`;
        setLoading(true);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token":localStorage.getItem("token")
                // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmNmZTZjMTYwNzI3ZTEyZTg1MmRlNCIsIm5hbWUiOiJIYWlsZWUuU3dhbmlhd3NraTgwIiwiaWF0IjoxNjY4MjMwNTg5fQ.Kcofz9Sv9wi82ZCnB-m722bZfVlodYNPbH1jxDb39Y8"
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if(data.success)
            {
                // console.log(data);
                getQuestions(CID);
            }
            else
            {
                toast(data.errors,{
                    position:toast.POSITION.BOTTOM_LEFT
                })
                toast.clearWaitingQueue();
            }
            setLoading(false);
        })
    }

    const getQuestions = (CID) => {
        setLoading(true);
        const url = `${baseUrl}/api/solution/readQuestions/${CID}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data);
            setQuestions(data.message);
            setLoading(false);
        })
    }

    const getOneQuestion = (QID) => {
        setLoading(true);
        const url = `${baseUrl}/api/solution/readQuestion/${QID}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data);
            setOneQuestion(data.message);
            setLoading(false);
        })
    }

    const updateSolution = (updatedData,CID,QID) => {
        // console.log(updatedData);
        setLoading(true);

        const url=`${baseUrl}/api/solution/updateQuestion/${QID}`;

        fetch(url,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token")
            },
            body:JSON.stringify(updatedData)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if(data.success)
            {                
                // console.log(data);
                getQuestions(CID);
            }
            else
            {
                toast(data.errors,{
                    position:toast.POSITION.BOTTOM_LEFT
                });
                toast.clearWaitingQueue();
            }
            setLoading(false);
        })
    }   

    return (
        // eslint-disable-next-line
        <SolutionContext.Provider value={{ questions, oneQuestion, loading, setQuestions, getQuestions, getOneQuestion, createSolution, updateSolution }}>
            {props.children}
        </SolutionContext.Provider>
    )
}

export default SolutionState;