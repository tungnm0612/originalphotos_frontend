import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import config from '../config';
import 'antd/dist/antd.css';
import { Table, Divider } from 'antd';
import AddUser from "../containers/AddUserScreen";

export default class TableUser extends Component {
    state ={
        users: [],
        imageofuser: []
    }

    componentDidMount(){
        axios.get(config.rootPath + "/api/users/getalluser").then( async (res) =>{
            const users = res.data.data.map((row, index) => ({
                key: index + 1,
                _id: row._id,
                username: row.username,
                fullname: row.fullname,
                email: row.email,
                phone: row.phone,
                disabled: row.disabled,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt
            }))
            this.setState({
                users: users
            })
            console.log(this.state.users)
        }).catch(err => {
            console.log(err);
        })
    }

    //Chang Password
    onchangePassword = async (record) =>{
        // event.preventDefault()
        console.log(record._id);
        await this.setState({
            idUser: record._id,
            username: record.username,
            fullname: record.fullname,
            email: record.email,
            phone: record.phone
        })
    }

    onSubmitChangePassword = async (event) =>{
        event.preventDefault()
        const newpassword = document.getElementById("changepassword").value;
        const retypepassword = document.getElementById("retypepassword").value
        if (newpassword === retypepassword) {
            axios.put(config.rootPath + '/api/users/updatepassword', {
                newpassword: newpassword,
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

    //ChangActive
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

    //View Images of User

    onViewImage = async (record) =>{
        // record.preventDefault()
        console.log(record._id);
        await this.setState({
            idUser: record._id,
            username: record.username
        })
        axios.post(config.rootPath + "/api/images/personal", {
            idUser: this.state.idUser
        }).then(async (res) =>{
            console.log(res.data.data.dataImage)
            if (!res.data.data.dataImage) {
                await this.setState({
                    imageofuser: []
                })
            } else {
                const imageofuser = await res.data.data.dataImage.map((row, index) => ({
                    key: index + 1,
                    _id: row._id,
                    idUser: row.idUser,
                    hashImage: row.hashImage,
                    transactionHash: row.transactionHash,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt
                }))
                await this.setState({
                    imageofuser: imageofuser
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    onSubmitChangeInfoAdmin = (event) =>{
        event.preventDefault();
        axios.put(config.rootPath + '/api/users/changeinfo', {
            idUser: this.state.idUser,
            username: document.getElementById('inputUsernameAmin').value,
            fullname: document.getElementById('inputFullnameAdmin').value,
            email: document.getElementById('inputEmailAdmin').value,
            phone: document.getElementById('inputPhoneAdmin').value,
        }).then(res =>{
            if(res.data.success === true){
                alert(res.data.message);
                window.location.href = '/personal'
            } else {
                alert(res.data.message);
            }
        }).catch(err => {
            console.log(err)
        })
    }


    render() {
        const columnsImage = [
            {
                title: "STT",
                dataIndex: "key",
                key: "key",
                align: 'center',
                // width: 60,
                // fixed: 'left',
            },
            {
                title: "Mã giao dịch",
                dataIndex: "transactionHash",
                // width: 500,
                key: "transactionHash",
                align: 'center'
            },
            {
                title: "Mã băm của ảnh",
                dataIndex: "hashImage",
                key: "hashImage",
                align: 'center'
            },
            {
                title: "Thời gian tạo (GMT)",
                dataIndex: "createdAt",
                // width: 100,
                key: "createdAt",
                align: 'center',
                // fixed: 'right',
                render: (text) =>{
                    return (
                     <p>{text.replace(/[T]/g, " ").substr(0, 19)}</p>
                    )
                }
            },
        ]

        const columns = [
            {
                title: "STT",
                dataIndex: "key",
                key: "key",
                align: 'center',
            },
            {
              title: 'Tài Khoản',
              dataIndex: 'username',
              key: 'username',
              align: 'center',
            //   render: text => <a data-toggle="modal" data-target="#imageofuser">{text}</a>,
              render: (text, record, index) =>{
                  return (
                    // <form onSubmit={this.onSubmitViewIamge} id="my_form">
                        <Link className="tagviewimguser" onClick={()=>this.onViewImage(record)} to="" data-toggle="modal" data-target="#imageofuser">{text}</Link>
                    // </form>
                  )
              },
            },
            {
              title: 'Họ và Tên',
              dataIndex: 'fullname',
              key: 'fullname',
              align: 'center'
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
              align: 'center'
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'phone',
                key: 'phone',
                align: 'center'
            },
            {
                title: 'Quyền đăng nhập',
                key: 'disabled',
                align: 'center',
                render: (text, record, index) => {
                    if (record.disabled === false) {
                        if (record._id === "5ddd58a4db459b05200cb835") {
                            return (
                                <span>
                                    <button className="btn btn-outline-secondary btn-sm" disabled>
                                        Tắt
                                    </button>
                                </span>
                            )
                        } else{
                            return (
                                <span>
                                    <button className="btn btn-success btn-sm" onClick={()=>this.onchangeActive(record)} data-toggle="modal" data-target="#enableActiveModal">
                                        Tắt
                                    </button>
                                </span>
                            )
                        }
                        
                    } else{
                        return (
                            <span>
                                <button className="btn btn-danger btn-sm" onClick={()=>this.onchangeActive(record)} data-toggle="modal" data-target="#disableActiveModal">
                                    Bật
                                </button>
                            </span> 
                        )
                    }
                }
            },
            {
                align: 'center',
                key: "changepassword",
                render: (text, record, index) => {
                    if(record._id === "5ddd58a4db459b05200cb835"){
                        return (
                            <span>
                                <button className="btn btn-info btn-sm" onClick={()=>this.onchangePassword(record)} data-toggle="modal" data-target="#changePasswordModal">
                                    Đổi mật khẩu
                                </button>
                                <Divider type="vertical" />
                                <button className="btn btn-warning btn-sm" onClick={()=>this.onchangePassword(record)} data-toggle="modal" data-target="#changeInfoModal">
                                    Sửa thông tin
                                </button>
                            </span>
                        )
                    } else {
                        return (
                            <span>
                                <button className="btn btn-info btn-sm" onClick={()=>this.onchangePassword(record)} data-toggle="modal" data-target="#changePasswordModal">
                                    Đặt lại mật khẩu
                                </button>
                                <Divider type="vertical" />
                                <button className="btn btn-warning btn-sm" onClick={()=>this.onchangePassword(record)} data-toggle="modal" data-target="#changeInfoModal">
                                    Sửa thông tin
                                </button>
                            </span>
                        )
                    }
                }
            }
          ];
        return (
            <div>
                {/* Enable Active Account */}
                <div className="modal fade" id="enableActiveModal" tabIndex="-1" role="dialog" aria-labelledby="enableActiveModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="enableActiveModalLabel">Tắt hoạt động</h5>
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

                {/* Disable Active Account */}
                <div className="modal fade" id="disableActiveModal" tabIndex="-1" role="dialog" aria-labelledby="disableActiveModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="disableActiveModalLabel">Bật hoạt động</h5>
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
                                    <input type="password" className="form-control" name="changepassword" id="changepassword"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Nhập lại mật khẩu:</label>
                                    <input type="password" className="form-control" name="retypepassword" id="retypepassword"/>
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
                
                {/* View Images's user */}
                <div className="modal fade" id="imageofuser" tabIndex="-1" role="dialog" aria-labelledby="imageofuserLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content modal-content-viewimage">
                            <div className="modal-header">
                                <h5 className="modal-title" id="imageofuserLabel">Danh sách giao dịch của tài khoản {this.state.username}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Table columns={columnsImage} dataSource={this.state.imageofuser}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* changeInfoModal */}
                <div className="modal fade" id="changeInfoModal" tabIndex="-1" role="dialog" aria-labelledby="changeInfoModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="changeInfoModalLabel">Thay đổi thông tin cá nhân</h5>
                                <button type="button" className="óng" data-dismiss="modal" aria-label="óng">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmitChangeInfoAdmin}>
                                    <div className="form-group">
                                        <label htmlFor="inputUsernameAdmin" className="col-form-label">Tài khoản</label>
                                        <input type="text" className="form-control" id="inputUsernameAmin" defaultValue={this.state.username} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputFullnameAdmin" className="col-form-label">Họ và Tên</label>
                                        <input type="text" className="form-control" id="inputFullnameAdmin" defaultValue={this.state.fullname} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmailAdmin" className="col-form-label">Email</label>
                                        <input type="email" className="form-control" id="inputEmailAdmin" defaultValue={this.state.email} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPhoneAdmin" className="col-form-label">Số điện thoại</label>
                                        <input type="tel" pattern="[0-9]{10}" className="form-control" id="inputPhoneAdmin" defaultValue={this.state.phone} required/>
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
                <h1>Danh sách các tài khoản</h1>
                <Table columns={columns} dataSource={this.state.users} />
                <div >
                    <AddUser/>
                </div>
            </div>
            </div>
        )
    }
}
