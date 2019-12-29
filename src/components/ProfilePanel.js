import React, { Component } from "react";
import {Link} from "react-router-dom"

class ProfilePanel extends Component {
  state= {

  }
  logout = () => {
    window.localStorage.removeItem('access_token');
    // window.location.href = "/";
    window.location.reload();
  }
  render() {
    const display = this.props.username ? (
      <div className="form-inline my-2 my-lg-0">
        <Link className="nav-link dropdown-toggle" to="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Xin chào, {this.props.username}
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item personal-item" to="/personal">Trang cá nhân</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" onClick={this.logout} to="">Đăng xuất</Link>
        </div>
      </div>
    ) : (
      <div className="form-inline my-2 my-lg-0">
        <Link className="nav-link dropdown" role="button" to="/login">Đăng nhập</Link>
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
