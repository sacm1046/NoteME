import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const Login = props => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <div className="row mt-5" id="login">
                <div className="col-md-4 col-1"> </div>
                <div className="col-md-4 col-10 letter">
                    <div className="form mt-2">
                        <div className="text-muted border-bottom pb-2">
                            <h5>Login</h5>
                        </div>
                        <div className="card-body text-muted">
                            <div className='text-white bg-danger rounded-pill text-center'>
                                <small>{store.errorLogin === null ? "" : store.errorLogin === "Usuario Bloqueado" ? store.errorLogin : store.errorLogin.msg}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="form-label text-muted">Email:</label>
                                <input type="text" id="username" name="username" onChange={e => actions.handleChange(e)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label text-muted">Contraseña:</label>
                                <input type="password" id="password" name="password" onChange={e => actions.handleChange(e)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-danger btn-block" onClick={() => actions.postLogin(props.history)}>Login</button>
                            <div className="d-flex justify-content-end">
                                <Link to="/registro"><small className="text-muted">Registro</small></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <small className="form-text text-light">NoteME®</small>
                </div>
            </div>
        </div>
    )
}

export default Login;