import React from 'react'
import "../css/Team.css"
import TestiMonialsDetails from './TestiMonialsDetails'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import image10 from "../images/team/priyansh.jpg"
import image11 from "../images/team/aditi.png"

export default function TeamWritter() {

    const media = window.matchMedia("(max-width:400px)");

    const writter = [
        {
            _key:0,
            name: 'Priyansh Shajan',
            linkedIn:"https://www.linkedin.com/mwlite/in/priyansh-shajan-583b6023a",
            instagram:"https://www.instagram.com/priyansh_shajan/",              
            img: image10
        },
        {
            _key:1,
            name: 'Aditi Kulkarni',            
            address: 'USA',
            img: image11
        }
    ]

    //Owl Carousel Settings
    const options3 = {
        loop: true,
        center: true,
        items: 1,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 7000,
        autoplayHoverPause:true,
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
            <h2 className="position">Content Writter</h2>
            <div className="col-md-4 setWeb">
                <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options3}>
                    {                        
                        writter.map(testiMonialDetail => {
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
