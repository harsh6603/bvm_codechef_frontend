import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/NoteState';
import Solutions from './components/Solutions';
import Questions from './components/Questions';
import Answer from './components/Answer';
import SolutionState from './context/SolutionState';
import Team from './components/Team';
import Main from './components/Main';
import All from './components/All';
import WithNav from './WithNav';
import WithoutNav from './WithoutNav';
import Login from './components/Login';
import Signup from './components/Signup';
import ComingSoon from './components/ComingSoon';

function App() {  

  const [activeTab, setActiveTab] = useState("home");

  const handleScroll = () => {
    if (document.querySelector("#home")) {
      const homePos = document.querySelector("#home").getBoundingClientRect().bottom;
      const aboutPos = document.querySelector("#about").getBoundingClientRect().bottom;
      const teamPos = document.querySelector("#team").getBoundingClientRect().bottom;
      const contactPos = document.querySelector("#contact").getBoundingClientRect().bottom;

      // console.log(homePos);
      // console.log(aboutPos);
      // console.log(teamPos);
      // console.log(contactPos);
      if (homePos >= 100)
        setActiveTab("home");
      else if (aboutPos >= 80)
        setActiveTab("about");
      else if (teamPos >= 50)
        setActiveTab("team");
      else if (contactPos >= 50)
        setActiveTab("contact");
    }
    else
      setActiveTab("event")
  }

  useEffect(() => {

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <div className="App">
      <Router basename='/codechef/' >
        
        <NoteState>
          <SolutionState>
            {/* <Navbar /> */}
            <Routes>
              <Route element={<WithNav activeTab={activeTab} />}>
                <Route exact path={"/"} element={<All setActiveTab={setActiveTab} />} />
                <Route exact path={"/events"} element={<Home setActiveTab={setActiveTab} />} />
                {/* <Route exact path={"/#about"} element={<About />} />               */}
                {/* <Route exact path={"/solutions"} element={<Solutions />} /> */}
                <Route exact path={"/solutions/:CID"} element={<Questions />} />
                <Route exact path={"/solutions/:CID/:QID"} element={<Answer />} />
                <Route exact path={"/commingsoon"} element={<ComingSoon />} />
              </Route>
              <Route element={<WithoutNav />}>
                <Route exact path={"/login"} element={<Login />} />
                <Route exact path={"/signup"} element={<Signup />} />
              </Route>
            </Routes>
          </SolutionState>
        </NoteState>
      </Router>
    </div>
  )
}

export default App
