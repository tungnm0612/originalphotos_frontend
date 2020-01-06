import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

export default class AddUserScreen extends Component {
    onSubmitAddUser = (event) =>{
        event.preventDefault();
        const password = document.getElementById("inputPasswordAdd").value;
        const retypepassword = document.getElementById("retypePasswordAdd").value
        if (password === retypepassword) {
            axios.post(config.rootPath + "/api/users/adduser", {
                fullname: document.getElementById("inputFullnameAdd").value,
                email: document.getElementById("inputEmailAdd").value,
                username: document.getElementById("inputUsernameAdd").value,
                password: document.getElementById("inputPasswordAdd").value,
                phone: document.getElementById('inputPhoneAdd').value
            }).then(res =>{
                alert(res.data.message);
                if (res.data.message === "Tạo tài khoản thành công!") {
                    window.location.href = "/personal"
                }
                // window.location.href = "/personal"
            }).catch(err =>{
                console.log(err)
            })
        } else {
            alert("Mật khẩu của bạn không khớp nhau!")
        }
        
    }
    render() {
        return (
            <div>
            <button type="button" className="btn btn-warning btn-lg" data-toggle="modal" data-target="#addUserModal">Tạo tài khoản</button>

            <div className="modal fade" id="addUserModal" tabIndex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addUserModalLabel text-left">Tạo tài khoản</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit = {this.onSubmitAddUser} className="form" >
                            <div className="form-group">
                                <label htmlFor="inputFullnameAdd" className="col-form-label">Họ và Tên</label>
                                <input type="text" className="form-control" id="inputFullnameAdd" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmailAdd" className="col-form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmailAdd" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPhoneAdd" className="col-form-label">Số điện thoại</label>
                                <input type="tel" pattern="[0-9]{10}" className="form-control" id="inputPhoneAdd" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputUsernameAdd" className="col-form-label">Tài khoản</label>
                                <input type="text" className="form-control" id="inputUsernameAdd" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPasswordAdd" className="col-form-label">Mật khẩu</label>
                                <input type="password" className="form-control" id="inputPasswordAdd" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="retypePasswordAdd" className="col-form-label">Nhập lại mật khẩu</label>
                                <input type="password" className="form-control" id="retypePasswordAdd" required/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                <button type="submit" className="btn btn-primary">Xác nhận</button>
                            </div>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
