import React from 'react'
import image1 from "../images/team/dharmesh.png"
import image2 from "../images/team/yash.png"
import image3 from "../images/team/priyank.png"
import image4 from "../images/team/shivam.png"
import "../css/Team.css"
import TestiMonialsDetails from './TestiMonialsDetails'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';

export default function TeamProblem() {

    const media=window.matchMedia("(max-width:400px)");

    const problemSetters = [
        {
            _key:0,
            name: 'Dharmesh Vala',
            linkedIn:"https://www.linkedin.com/in/dharmesh-vala-252724204",            
            img: image1
        },
        {
            _key:1,
            name: 'Yash Parsana',
            linkedIn:"https://www.linkedin.com/in/yash-parsana-a9176a1b2/",
            instagram:"",                
            img: image2
        },
        {
            _key:2,
            name: 'Priyank Pandit',
            linkedIn:"https://www.linkedin.com/in/priyank-pandit-5293671ba",
            instagram:"https://instagram.com/priyankk____?igshid=YmMyMTA2M2Y=",            
            img: image3
        },
        {
            _key:3,
            name: 'Shivam Patel',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            address: 'USA',
            img: image4
        },
    ]

    //Owl Carousel Settings
    const options = {
        loop: true,
        center: true,
        items: 3,
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
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };

    return (
        <div style={{zIndex:"1"}} className={`row ${(media.matches) ? "rowWithScale-mob" : "rowWithScale"}`}>
            <h2 className="position">Problem Setter</h2>
            <div className="col-md-12">
                <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                    {                        
                        problemSetters.map(testiMonialDetail => {
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
