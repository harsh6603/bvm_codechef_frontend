import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import solutionContext from "../context/SolutionContext"
import "../css/Answer.css"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { nnfxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { zenburn } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyToClipboard from 'react-copy-to-clipboard';
import Loading from './Loading';
import NoteContext from '../context/NoteContext';
import ScrollToTop from './scrollToTop';

export default function Answer() {

    const context = useContext(NoteContext)

    //context api of solution
    const sContext = useContext(solutionContext);

    const languageArray = ["C++", "Python", "Java"];

    //array for five name of language in syntexHiglighter component
    const parameterArray = ["cpp", "python", "java"];

    const { QID } = useParams()

    const [currentSelect, setCurrentSelect] = useState(0);

    let languages = document.getElementsByClassName("page-link");

    useEffect(() => {
        sContext.getOneQuestion(QID)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        for (let i = 0; i < languages.length; i++) {
            if (context.mode === "white") {
                if (languages[i].classList[1] === "select-dark") {
                    languages[i].classList.remove("select-dark");
                    languages[i].classList.add("select");
                }
            }
            else {
                if (languages[i].classList[1] === "select") {
                    languages[i].classList.remove("select");
                    languages[i].classList.add("select-dark");
                }
            }
        }
    }, [context.mode])

    const changeClass = (e) => {
        for (let i = 0; i < languages.length; i++) {

            languages[i].classList.remove("select");

            languages[i].classList.remove("select-dark");
        }

        if (context.mode === "white")
            e.target.classList.add("select");
        else
            e.target.classList.add("select-dark");
        setCurrentSelect(languageArray.indexOf(e.target.innerHTML));
    }

    const changeIcon = (e) => {
        // console.log(e.target.classList);
        e.target.classList.remove("fa-regular");
        e.target.classList.remove("fa-copy");
        e.target.classList.add("fa");
        e.target.classList.add("fa-check-circle");
        if (context.mode === "white")
            e.target.style.color = "green";
        else
            e.target.style.color = "white";
        e.target.style.fontSize = "25px";
        setTimeout(() => {
            e.target.classList.remove("fa");
            e.target.classList.remove("fa-check-circle");
            e.target.classList.add("fa-regular");
            e.target.classList.add("fa-copy");
            e.target.style.color = "";
            e.target.style.fontSize = "20px";
        }, 1700);
    }

    return (
        <>
        <ScrollToTop/>
            <div className={`${(context.mode === "white") ? "lightThemeSpecial" : "darkThemeSpecial"}`}>
                <div className={`container setAnswer`}>
                    {
                        (sContext.loading) &&
                        <Loading />
                    }
                    {
                        (!sContext.loading) &&
                        sContext.oneQuestion.map((oneQues) => {
                            return <div className='answer' key={oneQues._id}>
                                {/* <p>{oneQues.name}</p> */}
                                <h5>Problem</h5>
                                <pre dangerouslySetInnerHTML={{ __html: oneQues.question }}></pre>
                                <pre dangerouslySetInnerHTML={{ __html: oneQues.ioformat }}></pre>
                                <h5>Constraints</h5>
                                <pre className={`${(context.mode === "white") ? "testcase" : "testcase-dark"}`} dangerouslySetInnerHTML={{ __html: oneQues.constraints }}></pre>

                                <div className='parentDiv'>
                                    <p>Input</p>
                                    <div className='copyButtonTestCase' onClick={changeIcon}>
                                        <CopyToClipboard text={oneQues.inputs}>
                                            <i className="fa-regular fa-copy"></i>
                                            {/* <button>Copy to clipboard with button</button> */}
                                        </CopyToClipboard>
                                    </div>
                                    <pre className={`${(context.mode === "white") ? "testcase" : "testcase-dark"}`}>{oneQues.inputs}</pre>
                                </div>

                                <div className='parentDiv'>
                                    <p>Output</p>
                                    <div className='copyButtonTestCase' onClick={changeIcon}>
                                        <CopyToClipboard text={oneQues.outputs}>
                                            <i className="fa-regular fa-copy"></i>
                                            {/* <button>Copy to clipboard with button</button> */}
                                        </CopyToClipboard>
                                    </div>
                                    <pre className={`${(context.mode === "white") ? "testcase" : "testcase-dark"}`}>{oneQues.outputs}</pre>
                                </div>

                            </div>
                        })
                    }

                    {
                        (!sContext.loading) &&
                        <>
                            <h5 style={{ textAlign: "left" }}>Solution :</h5>

                            <nav style={{ zIndex: "-1" }} aria-label="">
                                <ul className="pagination pagination-lg" id="language">
                                    <li style={{ zIndex: "0" }} className="page-item" onClick={changeClass}><span className={`page-link select `}>C++</span></li>
                                    <li style={{ zIndex: "0" }} className="page-item" onClick={changeClass}><span className="page-link">Python</span></li>
                                    <li style={{ zIndex: "0" }} className="page-item" onClick={changeClass}><span className="page-link">Java</span></li>
                                </ul>
                            </nav>
                        </>
                    }


                    {
                        (!sContext.loading && sContext.oneQuestion.length !== 0) &&

                            (currentSelect < sContext.oneQuestion[0].solutions.length)
                            ?
                            sContext.oneQuestion.map((oneQues) => {
                                return <div className='answer' key={oneQues._id}>
                                    {
                                        // oneQues.solutions.map((element, index) => {
                                        //     return (currentSelect === index) && <div key={index} dangerouslySetInnerHTML={{__html: element}}>
                                        //         {/* {(currentSelect === index) && element} */}
                                        //     </div>
                                        // })
                                        oneQues.solutions.map((element, index) => {
                                            return (currentSelect === index && element !== null) ? <div className='parentDiv' key={index}>
                                                <div className='copyButton' onClick={changeIcon}>
                                                    <CopyToClipboard text={element}>
                                                        <i className="fa-regular fa-copy"></i>
                                                        {/* <button>Copy to clipboard with button</button> */}
                                                    </CopyToClipboard>
                                                </div>

                                                <SyntaxHighlighter
                                                    language={`${parameterArray[index]}`}
                                                    style={(context.mode === "white") ? docco : nnfxDark}
                                                    showLineNumbers={true}
                                                    wrapLines={true}
                                                >
                                                    {(currentSelect === index) && element}
                                                </SyntaxHighlighter>
                                            </div>
                                                :
                                                (currentSelect === index) &&
                                                <div className='commingSoon'>
                                                    coming soon . . .
                                                </div>
                                        })
                                    }
                                </div>
                            })
                            :
                            <div className='commingSoon' key={currentSelect}>
                                coming soon . . .
                            </div>
                    }

                    {/* <iframe src="https://trinket.io/embed/python/3d8d7ce66b?toggleCode=true" width="100%" height="500" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe> */}
                </div>
            </div>
        </>
    )
}
