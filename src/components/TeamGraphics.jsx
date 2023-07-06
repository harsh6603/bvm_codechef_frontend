import React from 'react'
import image7 from "../images/team/dhruv.png"
import image8 from "../images/team/jay.png"
import image9 from "../images/team/mustafa.png"
import "../css/Team.css"
import TestiMonialsDetails from './TestiMonialsDetails'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';

export default function TeamGraphics() {

    const media=window.matchMedia("(max-width:400px)");

    const graphicsDesigners = [
        {
            _key:0,
            name: 'Jay Pnchal',
            linkedIn:"https://www.linkedin.com/in/jay-panchal-8908b021b/",
            instagram:"https://www.instagram.com/jay.panchal_07",             
            img: image8
        },
        {
            _key:1,
            name: 'Dhruv Patadia',            
            address: 'USA',
            img: image7
        },
        {
            _key:3,
            name: 'Mustafa Kapasi',
            linkedIn:"https://www.linkedin.com/in/mustafa-kapasi-53a602223",
            instagram:"https://www.instagram.com/mustafakapasi19?r=nametag",             
            img: image9
        },
        {
            _key:4,
            name: 'Jay Pnchal',
            linkedIn:"https://www.linkedin.com/in/jay-panchal-8908b021b/",
            instagram:"https://www.instagram.com/jay.panchal_07",             
            img: image8
        },
        {
            _key:5,
            name: 'Dhruv Patadia',            
            address: 'USA',
            img: image7
        },
        {
            _key:6,
            name: 'Mustafa Kapasi',
            linkedIn:"https://www.linkedin.com/in/mustafa-kapasi-53a602223",
            instagram:"https://www.instagram.com/mustafakapasi19?r=nametag",             
            img: image9
        },        
    ]

    const options2 = {
        loop: true,
        center: true,
        autoplayHoverPause:true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots:true,
        dotsEach:5,
        autoplayTimeout: 7000,
        // smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };

    return (
        <div className={`row ${(media.matches) ? "rowWithScale-mob" : "rowWithScale"}`}>
            <h2 className="position">Graphics Designer</h2>
            <div className="col-md-12">
                <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options2}>
                    {                        
                        graphicsDesigners.map(testiMonialDetail => {
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
