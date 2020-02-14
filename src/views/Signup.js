import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const Signup = props => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card mt-2">
                        <div className="card-header text-muted">
                            Registro
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
                        <div className="card-footer d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary btn-block" onClick={() => actions.postSignup(props.history)}>Crear Usuario</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center pt-1">
                        <small className="form-text text-muted">NoteME®</small>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}

export default Signup;