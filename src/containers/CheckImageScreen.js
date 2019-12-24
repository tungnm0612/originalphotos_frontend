import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import config from '../config';
import Footer from '../components/Footer';
import Portfolio from '../components/Portfolio';

export default class CheckImageScreen extends Component {
    state = {
        loading: false
    }

    componentDidMount(){
        document.title = "OriginalPhotos - Kiểm tra ảnh"
    }

    onChange= async (evt) => {
         evt.preventDefault();
        await this.setState({
            file: evt.target.files[0],
        })
    }

    onClick = async (evt) => {
        await evt.preventDefault()
        if (!this.state.file) {
            alert('Bạn chưa chọn file.')
            return;
        }
        await this.setState({
            loading: true
        })
        const formData = await new FormData();
        await formData.append("checkimage", this.state.file);
        const configes = await {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        await axios.post(config.rootPath + '/api/images/checkimage', formData, configes).then( async (res) =>{
            console.log(res.data)
            if (res.data.status === true) {
                await this.setState({
                    status: res.data.status,
                    message: res.data.message,
                    email: res.data.infoPhotographer.email,
                    fullname: res.data.infoPhotographer.fullname,
                    transactionHash: res.data.infoPhotographer.transactionHash,
                    phone: res.data.infoPhotographer.phone
                })
                await this.setState({
                    loading: false
                })
            } else {
                if (res.data.status === false) {
                    await this.setState({
                        status: res.data.status,
                        message: res.data.message
                    })
                    await this.setState({
                        loading: false
                    })
                }
            }
        })
    }
    
    render() {
        const {loading} = this.state;
        
        const info = this.state.status === true ? (
            // <div className="col">
            <div className="card-body-info text-dark">
                <div className="card">
                        <h4 className="alert-heading" id="emailAlert">{this.state.message}</h4>
                        <hr/>
                        <div className="card-info">
                            <p className="mb-0" id="fullnamePhotographer"> Tác giả: {this.state.fullname}</p>
                            <p id="emailPhotographer">Email: {this.state.email}</p>
                            <p id="emailPhotographer">Số điện thoại: {this.state.phone}</p>
                            <p id="txHash">Mã giao dịch trên Blockchain: {this.state.transactionHash}</p>
                            {/* <p>&ensp; {this.state.transactionHash}</p> */}
                            <p>Bạn có thể truy cập vào website <a target="_blank" rel="noopener noreferrer" href="https://ropsten.etherscan.io/">ropsten.etherscan.io</a> để kiểm tra giao dịch</p>
                        </div>
               </div>
            </div>
            // </div>
        ):(
            this.state.status === false ? (
                <div className="card-body-info card-body-info-false text-dark">
                    <div className="card">
                        <h4 className="alert-heading" id="emailAlert">{this.state.message}</h4>
                        <hr/>
                        <div className="card-info text-info">
                            <p>Bạn vui lòng liên hệ với người cung cấp ảnh để tìm hiểu thêm thông tin.</p>
                        </div>
                    </div>
                </div>
            ): (
                <div></div>
            )
        )
        
        return (
            <div>
                <div>
                    <NavBar
                        onSearchChanged={this._onSearchChanged}
                        username={this.props.username}
                        onLogin={this.props.onLogin}
                    />
                </div>
                <header className="masthead-test bgCheckImage" >
                    <div className="overlay"></div>
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="site-heading intro-lead-in">
                            <h1>Kiểm tra ảnh</h1>
                            <span className="subheading">Bạn có thể kiểm tra những bức ảnh của mình có đúng là bức ảnh nguyên gốc hay không.</span>
                            {/* <a className="btn btn-warning btn-xl js-scroll-trigger" href="#checkimage">Kiểm tra ảnh</a> */}
                        </div>
                        </div>
                    </div>
                    </div>
                </header>
                    <div className="wrapper"  id="checkimage">
                        <div className="container flexcontainer">
                            {/* <div className="row"> */}
                                <div className="col">
                                    <div className="card card-check">
                                        <div className="card-body text-dark title-upload">
                                            <h4 className="" >Chọn ảnh bạn muốn kiểm tra</h4>
                                            <hr/>
                                            <form encType="multipart/form-data">
                                            <div className="form-group fileimg">
                                                <input onChange = {this.onChange} type="file" className="form-control-file " name="uploadimage" id="uploadimage" accept="image/*"></input>     
                                               
                                            </div>
                                            <div className="btncheck">
                                                <button onClick = {this.onClick} type="button" className="btn btn-success btn-block btn-lg mb-2" disabled={loading}>
                                                    {/* <b>Kiểm tra</b> */}
                                                    {loading && (
                                                        <i
                                                        className="spinner-border text-light"
                                                        style={{ marginRight: "5px" }}
                                                        />
                                                    )}
                                                    {loading && <span>Đang kiểm tra</span>}
                                                    {!loading && <span>Kiểm tra</span>}
                                                </button>
                                            </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    {info}
                                </div>
                            {/* </div> */}
                        </div>
                    </div>
                {/* </div> */}
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
