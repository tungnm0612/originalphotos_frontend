import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class UploadImage extends Component {
    render() {
        return (
            <div>
                <Link className="nav-link js-scroll-trigger" to='/uploadimage'>
                    <b>TẢI ẢNH LÊN</b>
                </Link>
            </div>
        )
    }
}
