import React from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom'

const NotFound = props => {
    return (
        <div className="container">
            <div className="row pt-5">
                <div className="col-md-12 d-flex justify-content-center">
                    <Link to="/" className='display-1 notFound'>Not Found</Link>
                </div>
            </div>
        </div>

    )
}

export default NotFound;