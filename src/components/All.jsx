import React from 'react'
import { useLocation } from 'react-router-dom'
import About from './About'
import Contact from './Contact'
import Footer from './Footer'
import Main from './Main'
import Team from './Team'

export default function All(props) {

    return (
        <div>
            <Main setActiveTab={props.setActiveTab}/>
            <About/>
            <Team/>
            <Contact/>
            <Footer/>
        </div>
    )
}
