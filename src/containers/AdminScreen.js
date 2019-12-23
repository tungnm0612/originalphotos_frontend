import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import config from '../config';
import 'antd/dist/antd.css';
import { Table } from 'antd';

export default class AdminScreen extends Component {
    state ={
        users: []
    }

    componentDidMount(){
        axios.get(config.rootPath + "/api/users/getalluser").then( async (res) =>{
            const users = res.data.data.map((row, index) => ({
                key: index + 1,
                _id: row._id,
                username: row.username,
                fullname: row.fullname,
                email: row.email,
                disabled: row.disabled
            }))
            this.setState({
                users: users
            })
            console.log(this.state.users)
        }).catch(err => {
            console.log(err);
        })
    }

    onchangeInputChangePassword = async (event) =>{
        // event.preventDefault();
        const changepassword = await event.target.value;
        await this.setState({
            changepassword: changepassword
        })
        await console.log(this.state.changepassword)
    }

    onChangeInputRetypePassword = async (event) => {
        const retypepassword = await event.target.value; 
        await this.setState({
            retypepassword: retypepassword
        })       
        await console.log(this.state.retypepassword) 
    }
    
    onchangePassword = async (record) =>{
        // event.preventDefault()
        console.log(record._id);
        await this.setState({
            idUser: record._id
        })
    }

    onSubmitChangePassword = async (event) =>{
        event.preventDefault()
        if (this.state.changepassword === this.state.retypepassword) {
            axios.put(config.rootPath + '/api/users/updatepassword', {
                newpassword: this.state.changepassword,
                idUser: this.state.idUser
            }).then(res => {
                // console.log(res.data.message)
                alert(res.data.message)
                window.location.href= "/personal"
            }).catch(err => {
                console.log(err)
            })
        } else{
            alert('Mật khẩu của bạn không khớp!')
        }
    }

    onchangeActive = async (record) => {
        await console.log(record.username);
        await console.log(record.disabled);
        this.setState({
            idUserActive: record._id,
            active: record.disabled
        })
    }

    onSubmitChangeActive = (event) => {
        event.preventDefault();
        axios.put(config.rootPath + '/api/users/active', {
            idUser: this.state.idUserActive,
            active: this.state.active
        }).then(res => {
            // console.log(res.data.message)
            // alert(res.data.message);
            window.location.href = "/personal"
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const columns = [
            {
                title: "STT",
                dataIndex: "key",
                key: "key"
            },
            {
              title: 'Tài Khoản',
              dataIndex: 'username',
              key: 'username',
              render: text => <a>{text}</a>,
            },
            {
              title: 'Họ và Tên',
              dataIndex: 'fullname',
              key: 'fullname'
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email'
            },
            {
                title: 'Hoạt động',
                key: 'disabled',
                render: (text, record, index) => {
                    if (record.disabled === false) {
                        if (record.username === "admin") {
                            return (
                                <span>
                                    <button disabled>
                                        Tắt
                                    </button>
                                </span>
                            )
                        } else{
                            return (
                                <span>
                                    <button onClick={()=>this.onchangeActive(record)} data-toggle="modal" data-target="#enableActiveModal">
                                        Tắt
                                    </button>
                                </span>
                            )
                        }
                        
                    } else{
                        return (
                            <span>
                                <button onClick={()=>this.onchangeActive(record)} data-toggle="modal" data-target="#disableActiveModal">
                                    Bật
                                </button>
                            </span>
                        )
                    }
                }
            },
            {
                key: "changepassword",
                render: (text, record, index) =>(
                    <span>
                        <button onClick={()=>this.onchangePassword(record)} data-toggle="modal" data-target="#changePasswordModal">
                            Đổi mật khẩu
                        </button>
                    </span>
                )
            }
          ];
        return (
            <div>
                {/* Enable Active Account */}
                <div className="modal fade" id="enableActiveModal" tabIndex="-1" role="dialog" aria-labelledby="enableActiveModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="enableActiveModalLabel">Bật hoạt động</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.onSubmitChangeActive}>
                                <div className="form-group">
                                    Bạn có muốn bật hoạt động của tài khoản này không?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                    <button type="submit" className="btn btn-primary">Đồng ý</button>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Disable Active Account */}
                <div className="modal fade" id="disableActiveModal" tabIndex="-1" role="dialog" aria-labelledby="disableActiveModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="disableActiveModalLabel">Tắt hoạt động</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.onSubmitChangeActive}>
                                <div className="form-group">
                                    Bạn có muốn tắt hoạt động của tài khoản này không?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                    <button type="submit" className="btn btn-primary">Đồng ý</button>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                
                {/* change password modal */}
                <div className="modal fade" id="changePasswordModal" tabIndex="-1" role="dialog" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="changePasswordModalLabel">Đổi mật khẩu</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmitChangePassword}>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Mật khẩu mới:</label>
                                    <input onChange={this.onchangeInputChangePassword} type="password" className="form-control" name="changepassword" id="changepassword"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Nhập lại mật khẩu:</label>
                                    <input onChange={this.onChangeInputRetypePassword} type="password" className="form-control" name="retypepassword" id="retypepassword"/>
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
            <div className="container tableadmin">
                <h1 className="">Danh sách các tài khoản</h1>
                <Table columns={columns} dataSource={this.state.users} />
                {/* <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tài Khoản</th>
                            <th scope="col">Họ và Tên</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) =>{
                            return(
                                <tr key = {user._id}>
                                    <th scope="row">{index + 1}</th>    
                                    <td>{user.username}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td><button onClick={this.onchangePassword} className="btn btn-secondary btn-sm" type="submit">Đổi mật khẩu</button> <button className="btn btn-secondary btn-sm" type="submit">Bật</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> */}
                <div>
                    {/* <button type="button" className="btn btn-secondary btn-lg">Tạo tài khoản</button> */}
                    <Link className="btn btn-secondary btn-lg" to="/admin/adduser">Tạo tài khoản</Link>
                </div>
            </div>
            </div>
        )
    }
}
