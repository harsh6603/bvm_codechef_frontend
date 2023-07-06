import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../css/footer.css"
import logo from '../images/CodeChef_BVM_Chapter-logo-2.png';

export default function Footer() {

    const media = window.matchMedia("(max-width:1000px)");

    const navi = useNavigate();

    const redirect = () => {
        navi("/")

        if (media.matches)
            closeNavbar.current.click();
    }

    return (
        <div className='footer' style={{ backgroundColor: "gainsboro" }}>
            <div className="container pt-5 pb-3">
                <div className="row">
                    <div className="col">
                        <div className="Footer12344">
                            <img src={logo} className="Footer1234" />
                            <h4>Codechef BVM Chapter</h4>
                        </div>
                        <div className="Footer12345">
                            <h5>About</h5>
                            <p>
                                CodeChef College Chapters are the programming clubs run and maintained by the official
                                Chapter Leaders and mentored by CodeChef. We aim to make
                                learning competitive
                                programming accessible for students across the globe.
                            </p>
                        </div>
                    </div>
                    <div className="col linksColumn">
                        <h5 className='arrangeTitle'>Quick Links</h5>
                        <ul className='ulTag'>
                            <li className='setPaddingList' onClick={redirect}><a className='setLinks' href='#home'>Home</a></li>
                            <li className='setPaddingList' onClick={redirect}><a className='setLinks' href='#about'>About Us</a></li>
                            <li className='setPaddingList' onClick={redirect}><a className='setLinks' href='#team'>Team</a></li>
                            <li className='setPaddingList'><Link className='setLinks' to="/events">Events</Link></li>
                            {/* <li className='setPaddingList'><Link className='setLinks' to="/solutions">Solutions</Link></li> */}
                            <li className='setPaddingList' onClick={redirect}><a className='setLinks' href='#contact'>Contact</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <div className="Footer99">
                            <h5>Follow Us</h5>
                            <p>
                                <a target="_blank" href="https://www.instagram.com/codechef_bvm/"><i className="fab fa-instagram instaContact sm_icon" style={{ fontSize: "24px" }}></i></a>
                                <a target="_blank" href="https://www.linkedin.com/in/codechef-bvm-chapter/"><i className="fab fa-linkedin sm_icon" style={{ fontSize: "24px" }}></i></a>
                                <a target="_blank" href="https://discord.gg/HaFsztXGqD"><i className="fab fa-discord sm_icon" style={{ fontSize: "22px" }}></i></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_info">Made with <small style={{color:"red"}}>&#10084;</small> by BVMITES</div>
            <div className="copyright_info">&copy; 2022 BVM Codechef Chapter | All Rights Reserved</div>
        </div>
    )
}
