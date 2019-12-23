import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import config from '../config';
import Footer  from '../components/Footer';
import Portfolio from '../components/Portfolio';
// import { Upload, message, Button, Icon } from 'antd';
// import web3 from '../web3';
// import image from '../image';
// import Web3 from 'web3';

export default class UploadImageScreen extends Component {
    state = {
        loading: false
    }

    componentDidMount(){
        document.title = "OriginalPhotos - Tải ảnh lên"
    }
     
    onChange= async (evt) => {
        evt.preventDefault();
        this.setState({
            file: evt.target.files[0],
            idUser: this.props.id
        })
    }

    onClick = async (evt) => {
        evt.preventDefault()
        
        if (!this.state.file) {
            alert('Bạn chưa chọn file!')
            return;
        }
        if(!this.state.idUser){
            alert('Bạn vui lòng đăng nhập để tải ảnh lên!')
            return;
        }
        await this.setState({
            loading: true
        })
        // const idUser = this.state.idUser
        const formData = new FormData();
        formData.append("uploadimage", this.state.file);
        formData.append("uploadimage", this.state.idUser);
        const configes = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(config.rootPath + '/api/images/uploadimage',formData, configes)
            .then( async (res) => {
                console.log(res.data.message);
                await this.setState({
                    loading: false
                })
                if(res.data.success === true){
                    await alert(res.data.message);
                    window.location.href = "/uploadimage"
                }else{
                    await alert(res.data.message);
                }
            }).catch(err =>{
                console.log(err)
            })
    }


    render() {
        // const changefile = {
        //     name: 'file',
        //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //     headers: {
        //       authorization: 'authorization-text',
        //     },
        //     onChange(info) {
        //       if (info.file.status !== 'uploading') {
        //         console.log(info.file, info.fileList);
        //       }
        //       if (info.file.status === 'done') {
        //         message.success(`${info.file.name} file uploaded successfully`);
        //       } else if (info.file.status === 'error') {
        //         message.error(`${info.file.name} file upload failed.`);
        //       }
        //     },
        //   };
        const {loading} = this.state;
        return (
            <div>
                <div>
                    <NavBar
                        onSearchChanged={this._onSearchChanged}
                        username={this.props.username}
                        id = {this.props.id}
                        onLogin={this.props.onLogin}
                    />
                </div>
                <header className="masthead-test bgUploadImage" >
                    <div className="overlay overlayupload"></div>
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="site-heading intro-lead-in">
                            <h1>Tải ảnh lên</h1>
                            <span className="subheading">Bạn có thể đăng tải những bức ảnh nguyên gốc của mình lên Blockchain.</span>
                            {/* <span className="subheading">A Blog Theme by Start Bootstrap</span> */}
                        </div>
                        </div>
                    </div>
                    </div>
                </header>
                <div>
                    <div className="wrapper wrapper-upload" id="uploadimage">
                        <div className="container">
                            <div className="row">
                                <div className="col-3 uploadcol"></div>
                                <div className="col">
                                    <div className="card card-upload">
                                        <div className="card-body text-dark title-upload">
                                            <h4>Chọn ảnh bạn muốn tải lên</h4>
                                            <form encType="multipart/form-data">
                                                <div className="form-group fileimg">
                                                    <input onChange = {this.onChange} type="file" className="form-control-file" name="uploadimage" id="uploadimage" accept="image/*"></input>
                                                    {/* <Upload {...changefile}>
                                                        <Button>
                                                        <Icon type="upload" /> Chọn ảnh tải lên
                                                        </Button>
                                                    </Upload>, */}
                                                </div>
                                                <div className="btncheck">
                                                    <button  onClick = {this.onClick}  type="submit" className="btn btn-success btn-block btn-lg mb-2" disabled={loading}>
                                                        {/* <b>Tải lên</b> */}
                                                        {loading && (
                                                            <i
                                                            className="spinner-border text-light"
                                                            style={{ marginRight: "5px" }}
                                                            />
                                                        )}
                                                        {loading && <span>Đang tải lên</span>}
                                                        {!loading && <span>Tải lên</span>}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3 uploadcol"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="port">
                    <Portfolio/>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
}
