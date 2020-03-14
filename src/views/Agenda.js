import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import ModalUserModificarAgenda from '../components/ModalUserModificarAgenda'
import ModalUserCrearNota from '../components/ModalUserCrearNota'
import ModalUserModificarNota from '../components/ModalUserModificarNota'

import { Link } from 'react-router-dom'

const Agenda = props => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        if (store.isAuthenticated === false) actions.goLogin(props.history);
        actions.getNotesAgenda('/api/notes/agenda/', store.currentAgenda.id);
    }, [actions, props.history, store.isAuthenticated, store.currentAgenda.id])
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-3 col-1"></div>
                <div className="col-md-6 col-10 letter">
                    <div className="row mb-3">
                        <div className="col-md-12 form-group d-flex justify-content-between border-bottom text-muted pt-3">
                            <h5 className="text-muted">Agenda {store.isAuthenticated === false ? "" : store.currentAgenda.title}</h5>
                            <div>
                                <i className="fas fa-pencil-alt mr-3" data-toggle="modal" data-target="#ModalUserModificarAgenda"></i>
                                <Link className={`fas fa-cog mr-3 text-muted ${store.isAuthenticated === false ? "" : store.currentUser.user.isAdmin === true ? "" : "d-none"}`} to='/admin'></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 border-bottom pb-2 mb-4">
                            <span>
                                <i className="fas fa-plus fa-2x mr-3 text-muted align-middle" onClick={() => actions.getDate()} data-toggle="modal" data-target="#ModalUserCrearNota"></i>
                                <label className="text-muted align-middle" onClick={() => actions.getDate()} data-toggle="modal" data-target="#ModalUserCrearNota">Nueva nota</label>
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ul>
                                {!!store.notes.length > 0 &&
                                    store.notes.map((item, i) => {
                                        return (
                                            <li key={i} className="border-bottom text-muted d-flex justify-content-between pt-2 pb-2">
                                                <i className='text-muted' onClick={() => actions.getNote(props.history, '/api/notes/', item.id)} >{item.title}</i>
                                                <span>
                                                    <i className="fas fa-trash-alt mr-3" onClick={() => actions.DeleteNote('/api/notes/', item.id)}></i>
                                                    <i className="fas fa-pencil-alt mr-3" id={item.id} onClick={(e) => actions.getNoteId(e)} data-toggle="modal" data-target="#ModalUserModificarNota"></i>
                                                </span>
                                            </li>)
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-7 mt-3 text-right">
                    <small onClick={() => actions.Logout()} className="text-danger font-weight-bold logout pt-1 pb-2 pl-3 pr-3 bg-light rounded-pill"><i className="fas fa-sign-out-alt text-danger"></i></small>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-12 d-flex justify-content-center">
                    <small className="form-text text-light">NoteME®</small>
                </div>
            </div>
            <ModalUserModificarAgenda />
            <ModalUserCrearNota />
            <ModalUserModificarNota />
            
        </div>
    )
}

export default Agenda