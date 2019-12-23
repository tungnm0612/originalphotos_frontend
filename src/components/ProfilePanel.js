import React, { Component } from "react";
// import {Link} from "react-router-dom"
// import axios from '../axios'

class ProfilePanel extends Component {
  state= {

  }
  logout = () => {
    // axios.delete("http://localhost:6969/api/auth/logout")
    // .then(() =>{
    //   window.location.href = "/";
    // }).catch((err) =>{
    //   console.log(err);
    // });
    window.localStorage.removeItem('access_token');
    window.location.href = "/";
  }
  // onSubmit = () =>{
    
  // }

  render() {
    const display = this.props.username ? (
      <div className="form-inline my-2 my-lg-0">
        <a className="nav-link dropdown-toggle " id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Xin chào, {this.props.username}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item personal-item" href="/personal">Trang cá nhân</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" onClick={this.logout}>Đăng xuất</a>
        </div>
      </div>
    ) : (
      <div className="form-inline my-2 my-lg-0">
        <a className="nav-link dropdown" role="button" href="/login">Đăng nhập</a>
      </div>
    );
    return (
      <div>
        {display}
      </div>
    )
  }
}

export default ProfilePanel;
