import React, { Component } from 'react'
import iconemail from '../img/icon/iconemail.png';
import iconphone from '../img/icon/iconphone.png';

export default class Footer extends Component {
    render() {
        return (
            <div>
                {/* <!-- Contact Section --> */}
                <section className="page-section-contract" id="contact">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                            <h2 className="mt-0">Thông tin liên hệ</h2>
                            <hr className="divider my-4"/>
                            <p className="text-muted mb-5"><b>Nếu như bạn có nhu cầu, Hãy liên hệ với tôi qua số điện thoại hoặc email</b></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                            <i className="fas fa-phone fa-3x mb-3 text-muted"><img className="fa-phone" src={iconphone} alt=""/></i>
                            <br/><br/>
                            <div><b>+84 373765932</b></div>
                            </div>
                            <div className="col-lg-4 mr-auto text-center">
                            <i className="fas fa-envelope fa-3x mb-3 text-muted"><img src={iconemail} alt="" /></i>
                            <br/><br/>
                            <div><b>tungnm52@wru.vn</b></div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Footer --> */}
                <footer className="bg-light py-5">
                    <div className="container">
                    <div className="small text-center text-muted"><b>Copyright &copy; 2019 - OriginalPhotos</b></div>
                    </div>
                </footer>
            </div>
        )
    }
}
