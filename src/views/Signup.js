import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const Signup = props => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-4"></div>
                <div className="col-md-4 letter">
                    <div className="form mt-2">
                        <div className="text-muted border-bottom pb-2">
                            <h5>Registro</h5>
                        </div>
                        <div className="card-body text-muted">
                            <div className='text-white bg-danger rounded-pill text-center'>
                                <small>{store.errorSignup === null ? "" : store.errorSignup === "Contraseñas diferentes" ? store.errorSignup : store.errorSignup.msg}</small>
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Email</label>
                                <input type="email" name="username" className="form-control" onChange={e => actions.handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Nombre</label>
                                <input type="text" name="fullname" className="form-control" onChange={e => actions.handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Contraseña</label>
                                <input type="password" name="password" className="form-control" onChange={e => actions.handleChange(e)} />
                                <small className="form-text text-muted">*Todos los campos son obligatorios</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-danger btn-block" onClick={() => actions.postSignup(props.history)}>Crear Usuario</button>
                            <div className="d-flex justify-content-end">
                                <Link to="/"><small className="text-muted">Login</small></Link>
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

export default Signup;