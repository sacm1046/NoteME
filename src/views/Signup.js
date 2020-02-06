import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import Navbar from '../components/Navbar';


const Signup = props => {
    const { /*store,*/ actions } = useContext(Context);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center mt-2">
                    <Navbar />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card mt-2">
                        <div className="card-header text-muted">
                            Registro
                    </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label className="text-muted">Email</label>
                                <input type="email" name="username" className="form-control" onChange={ e => actions.handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Nombre</label>
                                <input type="text" name="fullname" className="form-control" onChange={ e => actions.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Teléfono</label>
                                <input type="text" name="phone" className="form-control" onChange={ e => actions.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Contraseña</label>
                                <input type="password" name="password" className="form-control" onChange={ e => actions.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Repita su contraseña</label>
                                <input type="password" className="form-control" onChange={ e => actions.handleChange(e)}/>
                                <small className="form-text text-muted">*Todos los campos son obligatorios</small>
                            </div>
                        </div>
                        <div className="card-footer d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary btn-block" onClick={() => actions.postSignup(props.history)}>Crear Usuario</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center pt-1">
                        <small className="form-text text-muted">Powered by Sensetime®</small>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}

export default Signup;