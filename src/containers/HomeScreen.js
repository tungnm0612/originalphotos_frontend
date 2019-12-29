import React, { Component } from "react";

// import axios from "../axios";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import iconsecuriry from '../img/icon/iconsecurity.png';
import iconupload from '../img/icon/iconupload.png';
import iconcheck from '../img/icon/iconcheck.png';
import animal from "../img/homePortfolioGrid/animal.jpeg";
import beach from "../img/homePortfolioGrid/beach.jpeg";
import city from "../img/homePortfolioGrid/city.jpeg";
import moutain from "../img/homePortfolioGrid/moutain.jpeg";
import nature from "../img/homePortfolioGrid/nature.jpg";
import travel from "../img/homePortfolioGrid/travel.jpeg";

class HomeScreen extends Component {
  state = {
    // images: [],
    searchString: ""
  };

  componentDidMount(){
    document.title = "OriginalPhotos - Trang chủ"
}

  _onSearchChanged = text => this.setState({ searchString: text });

  render() {

    return (
      <div className="bg">
        <div className="">
          <NavBar
            onSearchChanged={this._onSearchChanged}
            username={this.props.username}
            onLogin={this.props.onLogin}
          />
        </div>
        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              <div className="intro-lead-in">Chào Mừng Bạn Đến Với Original Photos</div>
              <div className="intro-heading text-uppercase">Nice To Meet You</div>
              <a className="btn btn-warning btn-xl text-uppercase js-scroll-trigger" href="#services">Tìm Hiểu Thêm</a>
            </div>
          </div>
        </header>

        <section className="page-section" id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Dịch Vụ</h2>
                <h3 className="section-subheading text-muted">Cho phép kiểm tra ảnh nguyên gốc và đăng tải ảnh lên hệ thống Blockchain một cách nhanh chóng, an toàn</h3>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fas fa-circle fa-stack-2x text-primary"></i>
                  <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"><img src={iconcheck} alt=""/></i>
                </span>
                <br/><br/>
                <h4 className="service-heading">Kiểm Tra Ảnh</h4>
                <p className="text-muted">Hệ thống cho phép người dùng truy cập và kiểm tra trực tiếp trên hệ thống Blockchain những bức ảnh có phải ảnh nguyên gốc hay không một cách dễ dàng.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fas fa-circle fa-stack-2x text-primary"></i>
                  <i className="fas fa-laptop fa-stack-1x fa-inverse"><img src={iconupload} alt=""/></i>
                </span>
                <br/><br/>
                <h4 className="service-heading">Đăng Tải Ảnh</h4>
                <p className="text-muted">Hệ thống cho phép những nhà nhiếp ảnh gia, những người có những bức ảnh đẹp muốn đăng ký bản quyền cho bức ảnh của mình bằng cách đăng tải bức ảnh lên hệ thống Blockchain.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fas fa-circle fa-stack-2x text-primary"></i>
                  <i className="fas fa-lock fa-stack-1x fa-inverse"><img src={iconsecuriry} alt=""/></i>
                </span>
                <br/><br/>
                <h4 className="service-heading">An Toàn, Bảo Mật</h4>
                <p className="text-muted">Bởi vì bức ảnh được đăng tải lên hệ thống Blockchain nên dữ liệu không thể bị làm giả, bảo mật dữ liệu cao, các thông tin minh bạch, rõ ràng, chính xác.</p>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Portfolio Grid --> */}
        <section className="bg-light page-section" id="portfolio">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Chủ Đề</h2>
                <h3 className="section-subheading text-muted">Những bức ảnh lưu giữ lại những khoảnh khắc trong cuộc sống</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-6 portfolio-item">
                {/* <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1"> */}
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={animal} alt=""/>
                {/* </a> */}
                <div className="portfolio-caption">
                  <h4>Động Vật</h4>
                  {/* <p className="text-muted">Illustration</p> */}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 portfolio-item">
                {/* <a className="portfolio-link" data-toggle="modal" href="#portfolioModal2"> */}
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={beach} alt=""/>
                {/* </a> */}
                <div className="portfolio-caption">
                  <h4>Bãi Biển</h4>
                  {/* <p className="text-muted">Graphic Design</p> */}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 portfolio-item">
                {/* <a className="portfolio-link" data-toggle="modal" href="#portfolioModal3"> */}
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={city} alt=""/>
                {/* </a> */}
                <div className="portfolio-caption">
                  <h4>Thành Phố</h4>
                  {/* <p className="text-muted">Identity</p> */}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 portfolio-item">
                {/* <a className="portfolio-link" data-toggle="modal" href="#portfolioModal4"> */}
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={moutain} alt=""/>
                {/* </a> */}
                <div className="portfolio-caption">
                  <h4>Núi</h4>
                  {/* <p className="text-muted">Branding</p> */}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 portfolio-item">
                {/* <a className="portfolio-link" data-toggle="modal" href="#portfolioModal5"> */}
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={travel} alt=""/>
                {/* </a> */}
                <div className="portfolio-caption">
                  <h4>Du Lịch</h4>
                  {/* <p className="text-muted">Website Design</p> */}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 portfolio-item">
                {/* <a className="portfolio-link" data-toggle="modal" href="#portfolioModal6"> */}
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={nature} alt=""/>
                {/* </a> */}
                <div className="portfolio-caption">
                  <h4>Thiên Nhiên</h4>
                  {/* <p className="text-muted">Photography</p> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
