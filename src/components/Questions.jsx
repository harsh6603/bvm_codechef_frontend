import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useHref, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom'
import "../css/Solutions.css"
import NoteContext from '../context/NoteContext'
import solutionContext from "../context/SolutionContext"
import loading_icon from "../images/15.gif"
import Loading from './Loading'
import { ToastContainer } from 'react-toastify'
import { baseUrl } from '../config'
import ReactModal from 'react-modal'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ComingSoon from "./ComingSoon"
import ScrollToTop from './scrollToTop'

let tempSolutionObject = [];
export default function Questions() {

    //checking user
    const check = import.meta.env.VITE_CHECK;

    //array for storing an final code of 3 languages
    let solution = [];

    //array for storing temparary object    
    // let tempSolutionObject = [];

    //store question as string from file
    let que = "";

    //store input output format
    let IOFormat = "";

    //store test case input
    let testCaseInput = "";

    //store test case output
    let testCaseOutput = "";

    //store constraints
    let constraints = "";

    const languageArray = ["C++", "Python", "Java"];

    const sContext = useContext(solutionContext);
    const context = useContext(NoteContext);

    //reference of open add solution modal
    const addSolutionModalRef = useRef(null);

    //reference of close add solution modal
    const closeAddSolutionModal = useRef(null);

    //reference of update question and solution modal
    const updateSolutionModalRef = useRef(null);

    //reference of close button of update question and solution modal
    const closeUpdateSolutionModal = useRef(null);

    const closeResultImageModal = useRef(null);

    const [wantToUpdateQuestion, setWantToUpdateQuestion] = useState({
        editQuestionId: "",
        editQuestionNo: 0,
        editQuestionName: "",
        editQuestion: "",
        editFormat: "",
        editConstraint: "",
        editInputs: "",
        editOutputs: "",
        solutions: []
    })

    const { CID } = useParams();

    useEffect(() => {
        sContext.getQuestions(CID);
        context.getSingleEvent(CID);
        context.setImages("")
        // eslint-disable-next-line
    }, [])

    const addSolution = () => {
        addSolutionModalRef.current.click();
    }

    const checkInput = (e) => {

        if (e.target.name === "questionNo") {
            if (e.target.value === "") {
                e.target.value = "";
                e.target.parentElement.childNodes[2].innerHTML = "Please enter question number."
                e.target.parentElement.childNodes[2].style.visibility = "visible"
            }
            else {
                e.target.parentElement.childNodes[2].style.visibility = "hidden"
            }
        }

        if (e.target.name === "questionName") {
            if (e.target.value === "") {
                e.target.parentElement.childNodes[2].innerHTML = "Please enter question name."
                e.target.parentElement.childNodes[2].style.visibility = "visible"
            }
            else {
                e.target.parentElement.childNodes[2].style.visibility = "hidden"
            }
        }
    }

    const validationForAddSolution = (questionNo, name, question, format, constraint, inputs, outputs, cppFile, pyFile, javaFile) => {

        let check = true;
        if (questionNo.value === "") {
            questionNo.parentElement.childNodes[2].innerHTML = "Please enter question number."
            questionNo.parentElement.childNodes[2].style.visibility = "visible"
            check = false;
        }
        if (name.value === "") {
            name.parentElement.childNodes[2].innerHTML = "Please enter name of question."
            name.parentElement.childNodes[2].style.visibility = "visible"
            check = false;
        }
        if (question.value === "") {
            question.parentElement.childNodes[2].innerHTML = "Please enter question."
            question.parentElement.childNodes[2].style.visibility = "visible"
            check = false;
        }
        if (format.value === "") {
            format.parentElement.childNodes[2].innerHTML = "Please enter input output format of question."
            format.parentElement.childNodes[2].style.visibility = "visible"
            check = false;
        }
        if (constraint.value === "") {
            constraint.parentElement.childNodes[2].innerHTML = "Please enter constraints of question."
            constraint.parentElement.childNodes[2].style.visibility = "visible"
            check = false;
        }
        if (inputs.value === "") {
            inputs.parentElement.childNodes[2].innerHTML = "Please enter test case inputs of question."
            inputs.parentElement.childNodes[2].style.visibility = "visible"
            check = false;
        }
        if (outputs.value === "") {
            outputs.parentElement.childNodes[2].innerHTML = "Please enter test case outputs of question."
            outputs.parentElement.childNodes[2].style.visibility = "visible"
            check = false;
        }
        if (cppFile.value === "") {
            cppFile.parentElement.childNodes[2].innerHTML = "Please enter C++ solution of question."
            cppFile.parentElement.childNodes[2].style.visibility = "visible"
            check = false;
        }

        return check;
    }

    const handleSubmitSolution = () => {
        const questionNo = document.getElementById("questionNo");
        const name = document.getElementById("questionName");
        const question = document.getElementById("question");
        const format = document.getElementById("format");
        const constraint = document.getElementById("constraint");
        const inputs = document.getElementById("inputs");
        const outputs = document.getElementById("outputs");
        const cppFile = document.getElementById("C++");
        const pyFile = document.getElementById("Python");
        const javaFile = document.getElementById("Java");

        let result = validationForAddSolution(questionNo, name, question, format, constraint, inputs, outputs, cppFile, pyFile, javaFile);

        if (result) {

            closeAddSolutionModal.current.click();

            tempSolutionObject.sort((a, b) => {
                return a.no - b.no;
            })
            // console.log(tempSolutionObject);
            for (let i of tempSolutionObject) {

                solution.push(i.code);
            }

            // console.log(solution);
            // console.log(testCaseInput);
            // console.log(testCaseOutput);
            const data = {
                questionNo: questionNo.value,
                name: name.value,
                question: que,
                ioformat: IOFormat,
                constraints: constraints,
                inputs: testCaseInput,
                outputs: testCaseOutput,
                solutions: solution
            }

            // console.log(data); 

            questionNo.value = name.value = question.value = format.value = constraint.value = inputs.value = outputs.value = cppFile.value = pyFile.value = javaFile.value = "";
            tempSolutionObject = solution = [];
            sContext.createSolution(data, CID);
        }
    }

    //function for clear form in modal when user click on close button
    const clearForm = () => {
        const questionNo = document.getElementById("questionNo");
        const name = document.getElementById("questionName");
        const question = document.getElementById("question");
        const format = document.getElementById("format");
        const constraint = document.getElementById("constraint");
        const inputs = document.getElementById("inputs");
        const outputs = document.getElementById("outputs");
        const cppFile = document.getElementById("C++");
        const pyFile = document.getElementById("Python");
        const javaFile = document.getElementById("Java");

        questionNo.value = name.value = question.value = format.value = constraint.value = inputs.value = outputs.value = cppFile.value = pyFile.value = javaFile.value = "";
        tempSolutionObject = [];
        solution = [];
    }

    const clearUpdateForm = () => {
        const editQuestionNo = document.getElementById("editQuestionNo");
        const editQuestionName = document.getElementById("editQuestionName");
        const editQuestion = document.getElementById("editQuestion");
        const editFormat = document.getElementById("editFormat");
        const editConstraint = document.getElementById("editConstraint");
        const editInputs = document.getElementById("editInputs");
        const editOutputs = document.getElementById("editOutputs");
        const editCpp = document.getElementById("editC++");
        const editPython = document.getElementById("editPython");
        const editJava = document.getElementById("editJava");

        editQuestionNo.value = editQuestionName.value = editQuestion.value = editFormat.value = editConstraint.value = editInputs.value = editOutputs.value = editCpp.value = editPython.value = editJava.value = "";
        tempSolutionObject = [];
        solution = [];
    }

    let currentInputName;
    let currentInputId;

    const showFile = async (e) => {
        e.preventDefault();
        currentInputName = e.target.name;
        currentInputId = e.target.id;

        if (currentInputName === "question" || currentInputName === "format" || currentInputName === "inputs" || currentInputName === "outputs" || currentInputName === "constraint" || currentInputName === "C++")
            e.target.parentElement.childNodes[2].style.visibility = "hidden"

        // console.log(tempSolutionObject)
        // console.log("Hello")        

        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            if (currentInputName === "editQuestion" || currentInputName === "editFormat" || currentInputName === "editInputs" || currentInputName === "editOutputs" || currentInputName === "editConstraint") {
                setWantToUpdateQuestion({ ...wantToUpdateQuestion, [currentInputName]: text })
            }
            if (currentInputName === "question" || currentInputName === "editQuestion") {
                // console.log(text);
                que = text;
            }
            else if (currentInputName === "format" || currentInputName === "editFormat") {
                IOFormat = text;
            }
            else if (currentInputName === "inputs" || currentInputName === "editInputs") {
                testCaseInput = text;
            }
            else if (currentInputName === "outputs" || currentInputName === "editOutputs") {
                testCaseOutput = text;
            }
            else if (currentInputName === "constraint" || currentInputName === "editConstraint") {
                constraints = text;
            }
            else if ((currentInputName === "C++" && currentInputId === "editC++") || (currentInputName === "Java" && currentInputId === "editJava") || (currentInputName === "Python" && currentInputId === "editPython")) {
                let index = languageArray.indexOf(currentInputName);
                tempSolutionObject[index] = text;
            }
            else {

                let temp = {
                    no: languageArray.indexOf(currentInputName),
                    language: currentInputName,
                    code: text
                }

                // tempSolutionObject=[];

                //if language code already exist then update it
                let obj1 = tempSolutionObject.find((element, i) => {
                    if (element.language === currentInputName) {
                        tempSolutionObject[i] = temp;
                        return true; // stop searching
                    }
                });

                //if particular language code not exist in array then we push new object in array.
                if (!obj1) {
                    tempSolutionObject.push(temp);
                }
                // console.log(tempSolutionObject);
                // alert(text)
            }
        };
        reader.readAsText(e.target.files[0]);
    }


    const updateQuestionAndSolution = (clickedQuestion, operation) => {
        console.log(clickedQuestion);
        setWantToUpdateQuestion({
            editQuestionId: clickedQuestion._id,
            editQuestionNo: clickedQuestion.questionNo,
            editQuestionName: clickedQuestion.name,
            editQuestion: clickedQuestion.question,
            editFormat: clickedQuestion.ioformat,
            editConstraint: clickedQuestion.constraints,
            editInputs: clickedQuestion.inputs,
            editOutputs: clickedQuestion.outputs,
            solutions: clickedQuestion.solutions
        })
        tempSolutionObject = clickedQuestion.solutions
        // console.log(tempSolutionObject);
        if (operation === "update")
            updateSolutionModalRef.current.click();
        else
            handleDelete(clickedQuestion);
    }

    //assign new value in input feild of update modal
    const assignNewValue = (e) => {
        setWantToUpdateQuestion({ ...wantToUpdateQuestion, [e.target.name]: e.target.value })
    }

    //when user click on update button in modal
    const handleUpdate = () => {
        closeUpdateSolutionModal.current.click();
        const editQuestionNo = document.getElementById("editQuestionNo");
        const editQuestionName = document.getElementById("editQuestionName");
        const editQuestion = document.getElementById("editQuestion");
        const editFormat = document.getElementById("editFormat");
        const editConstraint = document.getElementById("editConstraint");
        const editInputs = document.getElementById("editInputs");
        const editOutputs = document.getElementById("editOutputs");
        const editCpp = document.getElementById("editC++");
        const editPython = document.getElementById("editPython");
        const editJava = document.getElementById("editJava");

        // console.log(tempSolutionObject);
        const updateQuestionData = {
            questionNo: wantToUpdateQuestion.editQuestionNo,
            name: wantToUpdateQuestion.editQuestionName,
            question: wantToUpdateQuestion.editQuestion,
            ioformat: wantToUpdateQuestion.editFormat,
            constraints: wantToUpdateQuestion.editConstraint,
            inputs: wantToUpdateQuestion.editInputs,
            outputs: wantToUpdateQuestion.editOutputs,
            solutions: tempSolutionObject
        }

        editQuestionNo.value = editQuestionName.value = editQuestion.value = editFormat.value = editConstraint.value = editInputs.value = editOutputs.value = editCpp.value = editPython.value = editJava.value = "";
        tempSolutionObject = [];
        solution = [];
        sContext.updateSolution(updateQuestionData, CID, wantToUpdateQuestion.editQuestionId);
    }

    //perform delete operation by changing deleted atribute value
    const handleDelete = (question) => {
        const updatedDataForDelete = {
            deleted: true,
        }
        sContext.updateSolution(updatedDataForDelete, CID, question._id);
    }

    //for image modal
    const [show, setShow] = useState(false);

    const handleClose = () => {
        window.history.replaceState({}, "", window.location.pathname);
        setShow(false);
    }

    const handleShow = () => {
        window.history.pushState({}, "", "#open-modal");
        setShow(true);
    }

    const handleHide = () => {
        // console.log("inside hide "+ new Date().getTime());
        history.back();
    }

    //for update question modal
    const [showQuesModalUpdate, setShowQuesModalUpdate] = useState(false);

    const handleCloseQuestionUpdate = () => {
        window.history.replaceState({}, "", window.location.pathname);
        setShowQuesModalUpdate(false);
    }
    const handleShowQuestionUpdate = () => {
        window.history.pushState({}, "", "#open-modal");
        setShowQuesModalUpdate(true);
    }

    const handleHideQuestionUpdate = () => {
        history.back();
    }

    //for add solution modal
    const [showAddQues, setShowAddQues] = useState(false);

    const handleCloseAddQuestion = () => {
        window.history.replaceState({}, "", window.location.pathname);
        setShowAddQues(false);
    }
    const handleShowAddQuestion = () => {
        window.history.pushState({}, "", "#open-modal");
        setShowAddQues(true);
    }

    const handleHideAddQuestion = () => {
        history.back();
    }

    //for result modal
    useEffect(() => {
        function handlePopState(event) {
            // console.log("Here"+ new Date().getTime())
            if (show)
                setShow(false);
        }

        if (context.images === "" && context.singleEvent.result !== undefined && sContext.questions.length !== 0 && context.singleEvent.result !== "") {
            context.getImages(context.singleEvent.result)
        }

        window.addEventListener("popstate", handlePopState);

        return () => {
            // console.log("Inside "+ new Date().getTime())
            window.removeEventListener("popstate", handlePopState);
        }
    }, [show])

    //for add question modal
    useEffect(() => {
        function handlePopState(event) {
            if (showAddQues)
                setShowAddQues(false);
        }

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        }
    }, [showAddQues])

    //for update question modal
    useEffect(() => {
        function handlePopState(event) {
            if (showQuesModalUpdate)
                setShowQuesModalUpdate(false);
        }

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        }
    }, [showQuesModalUpdate])

    return (
        <>
            <ScrollToTop/>
            <div className={`setQuestion ${(context.mode === "white") ? "lightThemeSpecial" : "darkThemeSpecial"}`}>
                <div className='container questionTable'>

                    {/* //update question modal */}
                    <Button ref={updateSolutionModalRef} className='d-none' variant="primary" onClick={handleShowQuestionUpdate}>
                        Launch static backdrop modal
                    </Button>

                    <Modal
                        show={showQuesModalUpdate}
                        // onHide={handleHideQuestionUpdate}
                        // backdrop="static"
                        keyboard={false}
                        animation={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Update Question</Modal.Title>
                            <Button ref={closeUpdateSolutionModal} className='modalBtn' variant="white" onClick={handleHideQuestionUpdate}>&times;</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="both">
                                    <label htmlFor='questionNo'>Question No</label>
                                    <input className='inputFeild' type="number" id="editQuestionNo" value={wantToUpdateQuestion.editQuestionNo} name="editQuestionNo" placeholder='Question No' onInput={assignNewValue} />
                                </div>
                                <div className="both">
                                    <label htmlFor='questionName'>Question Name</label>
                                    <input className='inputFeild' type="text" id="editQuestionName" value={wantToUpdateQuestion.editQuestionName} name="editQuestionName" placeholder='Question Name' onInput={assignNewValue} />
                                </div>
                                <div className="both">
                                    <label htmlFor='question'>Question</label>
                                    <input className='inputFeild' type="file" id="editQuestion" name="editQuestion" placeholder='Question' onChange={(e) => { showFile(e) }} />
                                </div>
                                <div className="both">
                                    <label htmlFor='format'>Input Output Format</label>
                                    <input className='inputFeild' type="file" id="editFormat" name="editFormat" placeholder='format' onChange={(e) => { showFile(e) }} />
                                </div>
                                <div className="both">
                                    <label htmlFor='constraint'>Constraints</label>
                                    <input className='inputFeild' type="file" id="editConstraint" name="editConstraint" placeholder='Constraint' onChange={(e) => { showFile(e) }} />
                                </div>
                                <div className="both">
                                    <label htmlFor='inputs'>Test case inputs</label>
                                    <input className='inputFeild' type="file" id="editInputs" name="editInputs" placeholder='Inputs' onChange={(e) => { showFile(e) }} />
                                </div>
                                <div className="both">
                                    <label htmlFor='outputs'>Test case outputs</label>
                                    <input className='inputFeild' type="file" id="editOutputs" name="editOutputs" placeholder='Outputs' onChange={(e) => { showFile(e) }} />
                                </div>
                                {/* <div className="both">
                                    <label htmlFor='question'>Question</label>
                                    <input className='inputFeild' type="text" id="question" name="question" placeholder='Question' />
                                </div> */}
                                <div className="both">
                                    <label htmlFor='solution'>C++ Solution</label>
                                    <input className='inputFeild' type="file" id="editC++" name="C++" placeholder='C++ Solution' onChange={(e) => { showFile(e) }} />
                                </div>
                                <div className="both">
                                    <label htmlFor='solution'>Python Solution</label>
                                    <input className='inputFeild' type="file" id="editPython" name="Python" placeholder='Python Solution' onChange={(e) => { showFile(e) }} />
                                </div>
                                <div className="both">
                                    <label htmlFor='solution'>Java Solution</label>
                                    <input className='inputFeild' type="file" id="editJava" name="Java" placeholder='Java Solution' onChange={(e) => { showFile(e) }} />
                                </div>
                                {/* <div className="both">
                                    <label htmlFor='solution'>Input file</label>
                                    <input className='inputFeild' type="file" id="file" name="file" placeholder='input file' onChange={(e) => { showFile(e) }} />
                                </div> */}
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={"dark"} onClick={handleUpdate}>Update Question</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* //add question modal */}
                    <Button ref={addSolutionModalRef} className='d-none' variant="primary" onClick={handleShowAddQuestion}>
                        Launch static backdrop modal
                    </Button>

                    <Modal
                        show={showAddQues}
                        // onHide={handleHideAddQuestion}                    
                        keyboard={false}
                        animation={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Add Question</Modal.Title>
                            <Button ref={closeAddSolutionModal} className='modalBtn' variant="white" onClick={handleHideAddQuestion}>&times;</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="both">
                                    <label htmlFor='questionNo'>Question No</label>
                                    <input className='inputFeild' type="number" id="questionNo" name="questionNo" placeholder='Question No' onInput={checkInput} />
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='questionName'>Question Name</label>
                                    <input className='inputFeild' type="text" id="questionName" name="questionName" placeholder='Question Name' onInput={checkInput} />
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='question'>Question</label>
                                    <input className='inputFeild' type="file" id="question" name="question" placeholder='Question' onChange={(e) => { showFile(e) }} />
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='format'>Input Output Format</label>
                                    <input className='inputFeild' type="file" id="format" name="format" placeholder='format' onChange={(e) => { showFile(e) }} />
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='inputs'>Constraints</label>
                                    <input className='inputFeild' type="file" id="constraint" name="constraint" placeholder='Constraint' onChange={(e) => { showFile(e) }} />
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='inputs'>Test case inputs</label>
                                    <input className='inputFeild' type="file" id="inputs" name="inputs" placeholder='Inputs' onChange={(e) => { showFile(e) }} />
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='outputs'>Test case outputs</label>
                                    <input className='inputFeild' type="file" id="outputs" name="outputs" placeholder='Outputs' onChange={(e) => { showFile(e) }} />
                                    <p className='errorMessage'></p>
                                </div>
                                {/* <div className="both">
                                    <label htmlFor='question'>Question</label>
                                    <input className='inputFeild' type="text" id="question" name="question" placeholder='Question' />
                                </div> */}
                                <div className="both">
                                    <label htmlFor='solution'>C++ Solution</label>
                                    <input className='inputFeild' type="file" id="C++" name="C++" placeholder='C++ Solution' onChange={(e) => { showFile(e) }} />
                                    <p className='errorMessage'></p>
                                </div>
                                <div className="both">
                                    <label htmlFor='solution'>Python Solution</label>
                                    <input className='inputFeild' type="file" id="Python" name="Python" placeholder='Python Solution' onChange={(e) => { showFile(e) }} />
                                </div>
                                <div className="both">
                                    <label htmlFor='solution'>Java Solution</label>
                                    <input className='inputFeild' type="file" id="Java" name="Java" placeholder='Java Solution' onChange={(e) => { showFile(e) }} />
                                </div>
                                {/* <div className="both">
                                    <label htmlFor='solution'>Input file</label>
                                    <input className='inputFeild' type="file" id="file" name="file" placeholder='input file' onChange={(e) => { showFile(e) }} />
                                </div> */}
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={"dark"} onClick={handleSubmitSolution}>Add Question</Button>
                        </Modal.Footer>
                    </Modal>

                    {
                        (sContext.loading) &&
                        <Loading />
                    }
                    {
                        (check === localStorage.getItem("type") && !(sContext.loading)) &&
                        <button type="button" style={{ backgroundColor: "gainsboro", color: "black" }} className={`btn mb-3`} onClick={addSolution}>Add Solution</button>
                    }
                    {
                        (!(sContext.loading)) &&
                        <div>
                            <h5 style={{ textAlign: 'justify', paddingBottom: "15px" }}>Description</h5>
                            <pre style={{ textAlign: 'justify' }}>
                                {context.singleEvent.description}
                            </pre>
                        </div>
                    }
                    {
                        (!(sContext.loading)) &&
                        <h5 style={{ textAlign: 'justify', paddingBottom: "15px" }}>Questions</h5>
                    }
                    {
                        (sContext.questions.length === 0 && !(sContext.loading)) &&
                        <ComingSoon />
                    }
                    {
                        (!(sContext.loading) && sContext.questions.length !== 0) &&
                        <table>
                            <thead style={{ border: `3px solid ${(context.mode === "white") ? "slategray" : "slategray"}` }}>
                                <tr>
                                    <th className={`${(context.mode === "white") ? "th-white" : "th-dark"}`}>No</th>
                                    <th className={`${(context.mode === "white") ? "th-white" : "th-dark"}`}>Questions</th>
                                    {
                                        (import.meta.env.VITE_CHECK === localStorage.getItem("type")) &&
                                        <th className={`${(context.mode === "white") ? "th-white" : "th-dark"}`}>Delete</th>
                                    }
                                    {
                                        (import.meta.env.VITE_CHECK === localStorage.getItem("type")) &&
                                        <th className={`${(context.mode === "white") ? "th-white" : "th-dark"}`}>Update</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sContext.questions.map((ques) => {
                                        return <tr key={ques._id}>
                                            <td>{ques.questionNo}</td>
                                            <td><Link target="_blank" className={`${(context.mode === "white") ? "question" : "question-dark"}`} to={`./${ques._id}`}>{ques.name}</Link></td>
                                            {
                                                (import.meta.env.VITE_CHECK === localStorage.getItem("type")) &&
                                                <td><p><i style={{ cursor: "pointer" }} className="fa-solid fa-trash" onClick={(e) => { updateQuestionAndSolution(ques, "delete") }}></i></p></td>
                                            }
                                            {
                                                (import.meta.env.VITE_CHECK === localStorage.getItem("type")) &&
                                                <td><p><i style={{ cursor: "pointer" }} className="fa-regular fa-pen-to-square" onClick={(e) => updateQuestionAndSolution(ques, "update")}></i></p></td>
                                            }
                                        </tr>
                                    })
                                }
                            </tbody>
                            {/* <tbody>
                    {
                        (sContext.questions)
                        ?
                        <div>
                        <img src={loading_icon} alt="loading" style={{ width: "15%", height: "100%" }} />
                        </div>
                        :
                        sContext.questions.map((ques) => {
                            return <tr key={ques._id}>
                            <td>{ques.questionNo}</td>
                            <td><Link className='question' to={`./${ques._id}`}>{ques.question}</Link></td>
                            </tr>
                        })
                    }
                </tbody> */}
                        </table>
                    }
                </div>

                <div>
                    {
                        (!(sContext.loading) && sContext.questions.length !== 0 && context.singleEvent.result !== "") &&
                        <Button className='mt-3' style={{ backgroundColor: "gainsboro", color: "black" }} variant={"none"} onClick={handleShow}>
                            View results
                        </Button>
                    }

                    <Modal
                        show={show}
                        onHide={handleHide}
                        centered

                        animation={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Result</Modal.Title>
                            <Button ref={closeResultImageModal} className='modalBtn' variant="white" onClick={handleHide}>&times;</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <img style={{ padding: (context.images) ? "" : "30%" }} width={"100%"} height="auto" src={(context.images) ? context.images : loading_icon} />
                        </Modal.Body>
                    </Modal>
                </div>

                <ToastContainer limit={1} toastStyle={{ backgroundColor: (context.mode === "white") ? "black" : "lightslategray", color: "white" }} icon={false} hideProgressBar closeButton={false} />
            </div>
        </>
    )
}
