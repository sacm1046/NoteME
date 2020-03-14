import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import { Link } from 'react-router-dom'

const Welcome = props => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if (store.isAuthenticated === false) {
            actions.goLogin(props.history)
        }
    }, [actions, props.history, store.isAuthenticated])
    return (
        <>
            {
                store.agendas.length > 0 ?
                    (
                        <div className="container">
                            <div className="row mt-5">
                                <div className="col-md-3 col-1"></div>
                                <div className="col-md-6 col-10 letter">
                                    <div className="row mb-3">
                                        <div className="col-md-12 form-group d-flex justify-content-between border-bottom text-muted">
                                            <h5 className="text-muted">Bienvenido {store.isAuthenticated === false ? "" : store.currentUser.user.fullname}</h5>
                                            <Link className={`fas fa-cog mr-3 text-muted ${store.isAuthenticated === false ? "" : store.currentUser.user.isAdmin === true ? "" : "d-none"}`} to='/admin'></Link>
                                        </div>
                                        {/* <div className="col-md-3 d-flex justify-content-end text-muted">
                                            <i className="fas fa-sign-out-alt" onClick={() => actions.Logout()}><small> SALIR</small></i>
                                        </div> */}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 from-group">
                                            <button className="btn btn-danger form-control mt-2" onClick={() => actions.getAgenda(props.history, '/api/agendas/', store.currentUser.user.id)}>Ir a mi agenda</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-7 text-right mt-3">
                                    <small onClick={() => actions.Logout()} className="text-danger font-weight-bold logout pt-1 pb-2 pl-3 pr-3 bg-light rounded-pill"><i className="fas fa-sign-out-alt text-danger"></i></small>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <small className="form-text text-light">NoteME®</small>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="container">
                            <div className="row mt-5">
                                <div className="col-md-3 col-1"></div>
                                <div className="col-md-6 col-10 letter">
                                    <div className="row mb-2">
                                        <div className="col-md-12 form-group d-flex justify-content-between border-bottom text-muted">
                                            <h5 className="text-muted">Bienvenido {store.isAuthenticated === false ? "" : store.currentUser.user.fullname}</h5>
                                            <Link className={`fas fa-cog mr-3 text-muted ${store.isAuthenticated === false ? "" : store.currentUser.user.isAdmin === true ? "" : "d-none"}`} to='/admin'></Link>
                                        </div>
                                        {/* <div className="col-md-3 d-flex justify-content-end text-muted">
                                            <i className="fas fa-sign-out-alt" onClick={() => actions.Logout()}><small> SALIR</small></i>
                                        </div> */}
                                    </div>
                                    <div className="row" >
                                        <div className="col-md-12 from-group">
                                            <label className="d-block text-muted form-label">Asigne un nombre a su agenda</label>
                                            <input type="text" name="titleAgenda" className="form-control" onChange={e => actions.handleChange(e)} />
                                            <button className="btn btn-danger form-control mt-3 mb-2" onClick={() => actions.postAgenda(props.history)}>Crear agenda</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-7 text-right mt-3">
                                    <small onClick={() => actions.Logout()} className="text-danger font-weight-bold logout pt-1 pb-2 pl-3 pr-3 bg-light rounded-pill"><i className="fas fa-sign-out-alt text-danger"></i></small>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <small className="form-text text-light">NoteME®</small>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Welcome;