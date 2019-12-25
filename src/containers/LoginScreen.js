import React, { Component } from 'react'
import NavBar from '../components/NavBar'

export default class LoginScreen extends Component {
    state = {
        username: '',
        password: '',
    }
    componentDidMount(){
        document.title = "OriginalPhotos - Đăng nhập"
    }

    handleInputChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.onLogin(this.state.username, this.state.password);
    }

    render() {
        console.log(this.state);
        const {loading} = this.props
        return (
            <div className="bgloginscreen">
                <div>
                    <NavBar/>
                </div>
                <div className="container form-login">
                    <div className="row no-gutter">
                        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                        <div className="col-md-8 col-lg-6 bg-form">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                <h3 className="login-heading mb-4"><b>Đăng nhập</b></h3>
                                <form onSubmit={this.handleSubmit}>
                                    <label htmlFor="inputUsername">Tài khoản </label>
                                    <input onChange={this.handleInputChange} type="text" name="username" id="inputUsername" className="form-control" required />
                                    <br/>
                                    <label htmlFor="inputPassword">Mật khẩu</label>
                                    <input onChange={this.handleInputChange} type="password" id="inputPassword" name="password" className="form-control" required/>

                                    <div className="custom-control custom-checkbox mb-3">
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" disabled={loading}>
                                        {/* Đăng nhập */}
                                        {loading && (
                                            <i
                                            className="spinner-border text-light"
                                            style={{ marginRight: "5px" }}
                                            />
                                        )}
                                        {loading && <span>Đang Đăng nhập</span>}
                                        {!loading && <span>Đăng nhập</span>}
                                    </button>
                                </form>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
