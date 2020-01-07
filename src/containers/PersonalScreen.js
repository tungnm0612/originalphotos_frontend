import React, { Component } from 'react'
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from 'axios';
import config from '../config'
import TableUser from "../components/TableUser";
import { Table, Divider } from 'antd';

export default class PersonalScreen extends Component {
    state = {
        listImage: [],
        infoPersonal: []
    }

    componentDidMount(){
        document.title = "OriginalPhotos - Trang cá nhân"
    }
    
    onSubmitChangePassword = (event) => {
        event.preventDefault();
        console.log("qweq" + this.props.id)
        const newpassword = document.getElementById("changepasswordPersonal").value;
        const retypepassword = document.getElementById("retypepasswordPersonal").value
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

    onSubmitChangeInfoPersonal = (event) => {
        event.preventDefault();
        // console.log(document.getElementById('inputPhone').value)
        axios.put(config.rootPath + '/api/users/changeinfo', {
            idUser: this.state.idUser,
            username: document.getElementById('inputUsername').value,
            fullname: document.getElementById('inputFullname').value,
            email: document.getElementById('inputEmail').value,
            phone: document.getElementById('inputPhone').value,
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
        // console.log(this.props.id)
        const idUser = this.props.id
        axios.post(config.rootPath + '/api/images/personal', {idUser})
            .then( res =>{
                // console.log(resImg.data.data.dataImage)
                if (!res.data.data.dataImage){
                    const infoPersonal = res.data.data.dataUser.map((row, index) =>({
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
                        infoPersonal: infoPersonal,
                        idUser: idUser,
                        username: infoPersonal[0].username,
                        fullname: infoPersonal[0].fullname,
                        email: infoPersonal[0].email,
                        phone: infoPersonal[0].phone,

                    })
                    // console.log(this.state.infoPersonal)
                } else {
                    const listImage = res.data.data.dataImage.map((row, index) =>({
                        key: index + 1,
                        _id: row._id,
                        idUser: row.idUser,
                        nameImage: row.nameImage,
                        hashImage: row.hashImage,
                        transactionHash: row.transactionHash,
                        createdAt: row.createdAt,
                        updatedAt: row.updatedAt
                    }))
                    const infoPersonal = res.data.data.dataUser.map((row, index) =>({
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
                    // console.log(infoPersonal)
                    // console.log(listImage)
                    this.setState({
                        listImage: listImage,
                        infoPersonal: infoPersonal,
                        idUser: idUser,
                        username: infoPersonal[0].username,
                        fullname: infoPersonal[0].fullname,
                        email: infoPersonal[0].email,
                        phone: infoPersonal[0].phone,
                    })
                    
                    // console.log(this.state.infoPersonal[0].username)
                    // console.log(this.state.username)
                }
            }
        ).catch(err => {
            console.log(err)
        })

        const columnsPersonal = [
            {
                title: "Tài khoản",
                dataIndex: "username",
                key: "username",
                align: 'center'
            },
            {
                title: "Họ và Tên",
                dataIndex: "fullname",
                key: "fullname",
                align: 'center'
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                align: 'center'
            },
            {
                title: "Số điện thoại",
                dataIndex: "phone",
                key: "phone",align: 'center'
            },
            {   
                width: 260,
                key: "changepassword",
                align: 'center',
                render: () => (
                    <span>
                        <button className="btn btn-warning btn-sm" data-toggle="modal" data-target="#changePasswordPersonalModal">Đổi mật khẩu</button>
                        <Divider type="vertical" />
                        <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#changeInfoPersonalModal">Sửa thông tin</button>
                    </span>
                )
            },
        ]

        const columnsImages = [
            {
                title: "STT",
                dataIndex: "key",
                key: "key",
                align: 'center'
            },
            {
                title: "Tên ảnh",
                dataIndex: "nameImage",
                key: "nameImage",
                align: 'center'
            },
            {
                title: "Mã giao dịch",
                dataIndex: "transactionHash",
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
                key: "createdAt",
                align: 'center',
                render: (text) =>{
                    return (
                     <p>{text.replace(/[T]/g, " ").substr(0, 19)}</p>
                    )
                }
            },
        ]

        const tableUser = this.props.id === "5ddd58a4db459b05200cb835" ? (
            <TableUser />
        ):(
            <div className="container tableInfoPersonal">
                <h1 className="title-tableUser">Thông tin tài khoản của bạn</h1>
                <Table columns={columnsPersonal} dataSource={this.state.infoPersonal}/>
            </div>
        )
        return (
            <div>
                {/* changePasswordPersonalModal */}
                <div className="modal fade" id="changePasswordPersonalModal" tabIndex="-1" role="dialog" aria-labelledby="changePasswordPersonalModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="changePasswordPersonalModalLabel">Đổi mật khẩu</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmitChangePassword}>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Mật khẩu mới:</label>
                                    <input type="password" className="form-control" name="changepasswordPersonal" id="changepasswordPersonal" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Nhập lại mật khẩu:</label>
                                    <input type="password" className="form-control" name="retypepasswordPersonal" id="retypepasswordPersonal" required/>
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

                {/* changeInfoPersonalModal */}
                <div className="modal fade" id="changeInfoPersonalModal" tabIndex="-1" role="dialog" aria-labelledby="changeInfoPersonalModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="changeInfoPersonalModalLabel">Thay đổi thông tin cá nhân</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmitChangeInfoPersonal}>
                                    <div className="form-group">
                                        <label htmlFor="inputUsername" className="col-form-label">Tài khoản</label>
                                        <input type="text" className="form-control" id="inputUsername" defaultValue={this.state.username} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputFullname" className="col-form-label">Họ và Tên</label>
                                        <input type="text" className="form-control" id="inputFullname" defaultValue={this.state.fullname} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail" className="col-form-label">Email</label>
                                        <input type="email" className="form-control" id="inputEmail" defaultValue={this.state.email} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPhone" className="col-form-label">Số điện thoại</label>
                                        <input type="tel" pattern="[0-9]{10}" className="form-control" defaultValue={this.state.phone} id="inputPhone" required/>
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

                <div className="">
                <NavBar
                    onSearchChanged={this._onSearchChanged}
                    username={this.props.username}
                    id = {this.props.id}
                    onLogin={this.props.onLogin}
                />
                </div>

                <header className="masthead-test bgPersonal" >
                    <div className="overlay"></div>
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="site-heading intro-lead-in">
                            <h1>Trang cá nhân</h1>
                            <a className="btn btn-warning btn-xl text-uppercase js-scroll-trigger" href="#infoPersonal">Xem thông tin</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </header>
                <div id="infoPersonal">
                    <div className="listUser">
                        {tableUser}
                    </div>
                    <hr/>
                    <div className="listimagePersonal">
                        <div className="container">
                            <h1 className="">Danh sách các giao dịch của bạn</h1>
                            <Table columns={columnsImages} dataSource={this.state.listImage}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
}
