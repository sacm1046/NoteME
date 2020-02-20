import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom'
import ModalUserCrearParrafo from '../components/ModalUserCrearParrafo'
import ModalUserSubirImage from '../components/ModalUserSubirImage'
import ModalUserModificarImage from '../components/ModalUserModificarImage'
import ModalUserModificarParrafo from '../components/ModalUserModificarParrafo'

const Note = props => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if (store.isAuthenticated === false) {
            actions.goLogin(props.history)
        }
        actions.getTextsNotes('/api/texts/note/', store.currentNote.id)
    }, [actions, props.history, store.isAuthenticated, store.currentNote.id])
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6 letter">
                    <div className="row mb-3 pt-3">
                        <div className="col-md-12 form-group d-flex justify-content-between border-bottom text-muted">
                            <h5 className="text-muted">Nota {store.currentNote.title}</h5>
                            <div className='d-flex justify-content-between'>
                                <label className="mr-3"><small className="d-flex justify-content-center">{store.date}</small></label>
                                <Link to="/agenda" className='fas fa-caret-square-left text-muted mr-3'></Link>
                                <Link className={`fas fa-cog mr-3 text-muted ${store.isAuthenticated === false ? "" : store.currentUser.user.isAdmin === true ? "" : "d-none"}`} to='/admin'></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ul>
                                {!!store.texts.length > 0 &&
                                    store.texts.map((item, i) => {
                                        return (
                                            <li key={i} className="border-bottom text-muted pt-2 pb-4">
                                                <div className="d-flex justify-content-between border-bottom pb-2">
                                                    <small>Fecha:{item.date} - Hora:{item.time}</small>
                                                    <span>
                                                        <i className="fas fa-trash-alt mr-3" onClick={() => actions.DeleteText('/api/texts/', item.id)}></i>
                                                        <i className="fas fa-pencil-alt mr-3" onClick={() => actions.getText('/api/texts/', item.id)} data-toggle="modal" data-target={`${item.content == null && item.url != null ? '#ModalUserModificarImage' : '#ModalUserModificarParrafo'}`}></i>
                                                    </span>
                                                </div>
                                                <div className={`d-flex justify-content-center pt-3 ${item.content != null && item.url == null ? 'd-none' : ''}`}>
                                                    <img src={item.url} width="300" alt="" className="" />
                                                </div>
                                                <div className={`pt-2 ${item.content != null && item.url == null ? '' : 'd-none'}`}>{item.content}</div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="row p-0 pl-3 pr-3">
                        <div className="col-md-12 d-flex justify-content-between pt-3 rounded-lg bg-danger text-light">
                            <p className="pl-2"><small>Agregar fotografías o párrafos</small></p>
                            <span className="text-muted d-flex justify-content-end pt-1">
                                <i className="fas fa-camera mr-3 text-light" onClick={() => actions.getDate()} data-toggle="modal" data-target="#ModalUserSubirImage"></i>
                                <i className="fas fa-file-alt mr-3 text-light" onClick={() => actions.getDate()} data-toggle="modal" data-target="#ModalUserCrearParrafo"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 text-right mb-4">
                    <small onClick={() => actions.Logout()} className="text-danger font-weight-bold logout pt-1 pb-2 pl-3 pr-3 bg-light rounded-pill"><i className="fas fa-sign-out-alt text-danger"></i></small>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-12 d-flex justify-content-center">
                    <small className="form-text text-light">NoteME®</small>
                </div>
            </div>
            <ModalUserCrearParrafo />
            <ModalUserSubirImage />
            <ModalUserModificarImage />
            <ModalUserModificarParrafo />
        </div>
    )
}

export default Note