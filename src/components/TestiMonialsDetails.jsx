import React from 'react';
import "../css/Team.css"
import "../images/team/dharmesh.png"
import "../images/team/yash.png"
import "../images/team/priyank.png"
import "../images/team/harsh.jpeg"
import "../images/team/rishbh.png"
import "../images/team/dhruv.png"
import "../images/team/jay.png"
import "../images/team/mustafa.png"
import "../images/team/priyansh.jpg"

const TestiMonialsDetails = ({testiMonialDetail}) => {
    const {name, img,linkedIn,instagram} = testiMonialDetail;    
    return (
        <div className="item">
            <div className="shadow-effect">
                <img className="img-circle" src={img} />
                {/* <p>{description}</p> */}
            </div>
            <div className="testimonial-name">
                <h5>{name}</h5>
                <div className="d-flex justify-content-evenly">                    
                    <a href={linkedIn} target="_blank"><i className="fa fa-linkedin-square"></i></a>
                    {
                        (instagram) &&
                        <a href={instagram} target="_blank"><i className="fa fa-instagram"></i></a>
                    }
                </div>
                {/* <small>{address}</small> */}
            </div>
        </div>
    );
};

export default TestiMonialsDetails;