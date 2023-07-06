import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'
import "../css/Contact.css"

export default function Contact() {
  
  const context = useContext(NoteContext)

  return (
    <div id="contact" className={`${(context.mode === "white")?"lightThemeSpecial":"darkThemeSpecial"}`} /*style={{ height: "100vh", backgroundColor: "skyblue" }}*/>
      <h1 className='styleContact'>Contact</h1>
      {/* <section id="Contact"> */}
        <div className="contact">          
          <br />
          <div className="small_message">It will be our pleasure to meet you &#128525;</div>

          <br />
          <br />


          <div className="contact-in">
            <div className="contact-map">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.714222328785!2d72.92161511479158!3d22.552375585193197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e74be922c29%3A0x1b8144f0aa4bbdcb!2sBVM%20Main%20building!5e0!3m2!1sen!2sin!4v1631530886962!5m2!1sen!2sin`}
                width="100%" height="auto" frameBorder="0" style={{border:"0"}}></iframe>
            </div>
            <div className="contact-form">
              {/* <h1>Reach Us :</h1> */}
              <br/>             
              <div className="contact_form_info">

                <a href="https://www.instagram.com/codechef_bvm/"><i className={`${(context.mode === "white")?"fab":"fab-dark"} fab fa-instagram instaContact sm_icon`} style={{fontSize:"24px"}}></i></a> <a className={`${(context.mode === "white")?"social_media":"social_media_dark"} social_media`}
                  href="https://www.instagram.com/codechef_bvm/" target="_blank">codechef_bvm</a> <br /><br />

                <a href={`https://www.linkedin.com/in/codechef-bvm-chapter-615425220/`}><i className={`${(context.mode === "white")?"fab":"fab-dark"} fab fa-linkedin sm_icon`} style={{fontSize:"24px"}}></i></a> <a className={`${(context.mode === "white")?"social_media":"social_media_dark"} social_media`}
                  href={`https://www.linkedin.com/in/codechef-bvm-chapter-615425220/`} target="_blank">codechef_bvm</a><br /><br />

                <a href="https://discord.gg/HaFsztXGqD"><i className={`${(context.mode === "white")?"fab":"fab-dark"} fab fa-discord sm_icon`} style={{fontSize:"22px"}}></i></a><a className={`${(context.mode === "white")?"social_media":"social_media_dark"} social_media`} href="https://discord.gg/HaFsztXGqD"
                  target="_blank">codechef_bvm</a><br /><br />
                <a href="mailto: codechef.bvm-chapter@bvmengineering.ac.in"><i className="fa fa-envelope sm_icon" style={{fontSize:"24px",color:(context.mode==="white")?"black":"white"}}></i></a> <a className={`${(context.mode === "white")?"social_media":"social_media_dark"} social_media`}
                  href="mailto: codechef.bvm-chapter@bvmengineering.ac.in" target="_blank">codechef.bvm-chapter@bvmengineering.ac.in</a><br />
                <br />
              </div>

            </div>
          </div>

        </div>
      {/* </section> */}
    </div>
  )
}
