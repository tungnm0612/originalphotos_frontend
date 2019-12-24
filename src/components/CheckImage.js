import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class CheckImage extends Component {
    render() {
        return (
            <div>
                <Link className="nav-link js-scroll-trigger" to="/checkimage">
                    <b>KIỂM TRA ẢNH</b>
                </Link>
            </div>
        )
    }
}
