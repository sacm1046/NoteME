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
        if(store.isAuthenticated===false){
            actions.goLogin(props.history)}
            actions.getTexts('/api/texts')    
    }, [])
    return (
        <div className="container">
            <div className="row pt-5 mb-3">
                <div className="col-md-3"></div>
                <div className="col-md-5 form-group d-flex justify-content-between border-bottom text-muted">
                    <h5 className="text-muted">Nota {store.currentNote.title}</h5>
                    <div className='d-flex justify-content-end'>
                        <Link className='fas fa-caret-square-left text-muted' to='/agenda' onClick={actions.getAgendas('/api/agendas')}></Link>
                    </div>
                </div>
                <div className="col-md-1 ml-1 form-group border-bottom text-muted">
                    <h6>{store.date}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <ul>
                        {!!store.texts.length > 0 &&
                            store.texts.map((item, i) => {
                                if (item.note.id === store.currentNoteId) {
                                    return (
                                        <li key={i} className="border-bottom text-muted pt-2 pb-4">
                                            <div className="d-flex justify-content-between border-bottom pb-2">
                                                <small>Fecha:{item.date} - Hora:{item.time}</small>
                                                <span>
                                                    <i className="fas fa-trash-alt mr-3" onClick={() => actions.DeleteText('/api/texts/', item.id)}></i>
                                                    <i className="fas fa-pencil-alt mr-3" onClick={() => actions.getText('/api/texts/', item.id)} data-toggle="modal" data-target='#ModalUserModificarParrafo'></i>
                                                    {/* <i className="fas fa-pencil-alt mr-3" onClick={() => actions.getText('/api/texts/', item.id)} data-toggle="modal" data-target='#ModalUserModificarImage'></i> */}
                                                </span>
                                            </div>
                                            <div className='pt-2'>{item.content}</div>
                                            
                                        </li>
                                    )
                                }
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
                        <i className="fas fa-camera mr-3" data-toggle="modal" data-target="#ModalUserSubirImage"></i>
                        <i className="fas fa-file-alt mr-3" onClick={() => actions.getDate()} data-toggle="modal" data-target="#ModalUserCrearParrafo"></i>
                        {/* <i className="fas fa-list-alt mr-1"></i> */}
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