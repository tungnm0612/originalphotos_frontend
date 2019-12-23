import React, { Component } from 'react'
import image1 from "../img/portfolio/1.jpg"
import image2 from "../img/portfolio/2.jpg"
import image3 from "../img/portfolio/3.jpg"
import image4 from "../img/portfolio/4.jpg"
import image5 from "../img/portfolio/5.jpg"
import image6 from "../img/portfolio/6.jpg"


export default class Portfolio extends Component {
    render() {
        return (
            <div>
                <section id="portfolio">
                    <div className="container-fluid p-0">
                    <div className="row no-gutters">
                        <div className="col-lg-4 col-sm-6">
                            <img className="img-fluid" src={image1} alt=""/>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <img className="img-fluid" src={image2} alt=""/>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <img className="img-fluid" src={image3} alt=""/>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <img className="img-fluid" src={image4} alt=""/>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <img className="img-fluid" src={image5} alt=""/>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <img className="img-fluid" src={image6} alt=""/>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        )
    }
}
