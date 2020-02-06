import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const Login = props => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-4"> </div>
                <div className="col-md-4">
                    <div className="form card mt-2">
                        <div className="card-header text-muted">
                            Login
                        </div>
                        <div className="card-body">
                        <label className={`text-muted ${store.error.msg?"":"d-none"}`}>{!!store.error && store.error.msg}</label>
                            <div className="form-group">
                                
                                <label htmlFor="username" className="form-label text-muted d-inline">Username:</label>
                                <input type="text" id="username" name="username" onChange={e => actions.handleChange(e)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label text-muted">Password:</label>
                                <input type="password" id="password" name="password" onChange={e => actions.handleChange(e)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary btn-block" onClick={() => actions.postLogin(props.history)}>Login</button>
                            <div className="d-flex justify-content-end">
                                <Link to="/registro"><small className="text-muted">Registro</small></Link>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center pt-1">
                        <small className="form-text text-muted">NoteME®</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;