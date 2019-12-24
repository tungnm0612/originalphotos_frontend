import React, { Component } from "react";
import Headroom from "headroom.js";
import ProfilePanel from "./ProfilePanel";
import CheckImage from './CheckImage';
import Home from './Home';
import UploadImage from "./UploadImage";
import {Link} from 'react-router-dom';

class NavBar extends Component {

  componentDidMount() {
    const header = document.getElementById('mainNav');
    const headroom = new Headroom(header);
    headroom.init();
  }

  render() {
    return (
      <div onScroll={this.listenScrollEvent}>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
          <div className="container">
            <Link className="navbar-brand js-scroll-trigger" to="/"><b>Original Photos </b></Link>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav  ml-auto">
              <li className="nav-item navhome text-uppercase">
                  <Home />
                </li>
                <li className="nav-item navcheck text-uppercase">
                  <CheckImage/>
                </li>
                <li className="nav-item navupload text-uppercase">
                  <UploadImage/>
                </li>
                <li className="nav-item">
                  {/* <a className="nav-link js-scroll-trigger" href="#team">Team</a> */}
                </li>
                <li className="col navprofile nav-item">
                  <ProfilePanel
                    // className ="col"
                    username={this.props.username}
                    id = {this.props.id}
                    onLogin={this.props.onLogin}
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
