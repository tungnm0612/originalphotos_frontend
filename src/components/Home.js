import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="home">
                    <Link className="" to="/">
                        TRANG CHỦ 
                    </Link>
                    {/* <a href="/">Trang chur</a> */}
                </div>
            </div>
        )
    }
}
