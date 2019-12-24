import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="home">
                    <Link className="nav-link js-scroll-trigger" to="/">
                        <b>TRANG CHỦ</b>
                    </Link>
                    {/* <a href="/">Trang chur</a> */}
                </div>
            </div>
        )
    }
}
