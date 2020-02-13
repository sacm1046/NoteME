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
            <div className="row pt-5 mb-3">
                <div className="col-md-3"></div>
                <div className="col-md-5 form-group d-flex justify-content-between border-bottom text-muted">
                    <h5 className="text-muted">Nota {store.currentNote.title}</h5>
                    <div className='d-flex justify-content-end'>
                        <Link to="/agenda" className='fas fa-caret-square-left text-muted' /* onClick={actions.getAgendasUser('/api/agendas/user/', store.currentUser.user.id)} */></Link>
                    </div>
                </div>
                <div className="col-md-1 form-group border-bottom text-muted">
                    <h6>{store.date}</h6>
                </div>
                <div className="col-md-3 d-flex justify-content-end text-muted">
                    <i className="fas fa-sign-out-alt" onClick={() => actions.Logout()}><small> SALIR</small></i>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
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
                                                <img src={item.url} width="400" alt="" />
                                            </div>
                                            <div className={`pt-2 ${item.content != null && item.url == null ? '' : 'd-none'}`}>{item.content}</div>
                                        </li>
                                    )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="row p-0">
                <div className="col-md-3"></div>
                <div className="col-md-6 d-flex justify-content-between bg-light pt-2">
                    <p className="pl-2 text-muted"><small>Agregar fotografías, textos o listas</small></p>
                    <span className="text-muted d-flex justify-content-end pt-1">
                        <i className="fas fa-camera mr-3" onClick={() => actions.getDate()} data-toggle="modal" data-target="#ModalUserSubirImage"></i>
                        <i className="fas fa-file-alt mr-3" onClick={() => actions.getDate()} data-toggle="modal" data-target="#ModalUserCrearParrafo"></i>
                    </span>
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