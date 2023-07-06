import React from 'react'
import "../css/Team.css"
import TestiMonialsDetails from './TestiMonialsDetails'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import image5 from "../images/team/harsh.jpeg"
import image6 from "../images/team/rishbh.png"

export default function TeamWeb() {

    const media=window.matchMedia("(max-width:400px)");

    const webDevlopers = [
        {
            _key:0,
            name: 'Harsh Thakkar',
            linkedIn:"https://www.linkedin.com/in/harsh-thakkar-79101b217",
            instagram:"",            
            img: image5
        },
        {
            _key:1,
            name: 'Rishabh Parmar',
            linkedIn:"https://www.linkedin.com/in/rishabh-parmar-650541200/",
            instagram:"https://www.instagram.com/rishabhpar7/?hl=en",                        
            img: image6
        },
    ]

    //Owl Carousel Settings
    const options1 = {
        loop: true,
        center: true,
        margin: 0,
        autoplay: true,
        slideBy:4,
        autoplayHoverPause:true,
        // autoWidth:true,      
        items: 1,
        scrollperpage : "true",
        autoplayTimeout: 7000,
        // smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    };

    return (
        <div className={`row ${(media.matches) ? "rowWithScale-mob" : "rowWithScale"}`}>
            <h2 className="position">web devloper</h2>
            <div className="col-md-4 setWeb">
                <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options1}>
                    {                        
                        webDevlopers.map(testiMonialDetail => {
                            return (
                                <TestiMonialsDetails testiMonialDetail={testiMonialDetail} key={testiMonialDetail._key} />

                            )
                        })
                    }
                </OwlCarousel>
            </div>
        </div>
    )
}
