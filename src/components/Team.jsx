import React, { useContext } from 'react';
import "../css/Team.css"
import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

import TeamProblem from './TeamProblem';
import TeamWeb from './TeamWeb';
import TeamGraphics from './TeamGraphics';
import TeamWritter from './TeamWritter';
import NoteContext from '../context/NoteContext';

export default function Team() {  

  const context = useContext(NoteContext)

  return (
    // <div>
    <div id="team" className={`${(context.mode === "white")?"lightThemeSpecial":"darkThemeSpecial"}`} /*style={{ height: "100vh", backgroundColor: "lightblue" }}*/>
      <h1 className='styleTeam'>Team</h1>

      <div className="small_message smallMessageTeam">Team is our strength &#128526;</div>

      <section id="testimonial" className="testimonials">
        <div className="container">
          {/* <h4 className="miniTitle text-center">TESTIMONIALS</h4> */}
          <div className="text-center ">
            {/* <h3 className="sectionTitle">What Our Clients are Saying?</h3> */}
          </div>
          {/* <p className="text-center ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p> */}
                    

          <TeamProblem/>

          {/* web devloper */}
          
          <TeamWeb/>

          {/* graphics designer */}

          <TeamGraphics/>          

          {/* content writer */}
          
          <TeamWritter/>

        </div>
      </section>
    </div>
    // </div>
  )
}
