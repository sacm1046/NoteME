import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import ModalUserModificarAgenda from '../components/ModalUserModificarAgenda'
import ModalUserCrearNota from '../components/ModalUserCrearNota'
import ModalUserModificarNota from '../components/ModalUserModificarNota'
import { Link } from 'react-router-dom'

const Agenda = props => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        if(store.isAuthenticated===false){
            actions.goLogin(props.history)}
            actions.getNotes('/api/notes')    
    }, [])
    return (
        <div className="container">
            <div className="row pt-5 mb-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 form-group d-flex justify-content-between border-bottom text-muted">
                    <h5 className="text-muted">Agenda {store.isAuthenticated===false?"":store.currentAgenda.title}</h5>
                    <div className="">
                        <i className="fas fa-pencil-alt mr-3" data-toggle="modal" data-target="#ModalUserModificarAgenda"></i>
                        <Link className={`fas fa-cog mr-3 text-muted ${store.isAuthenticated===false?"":store.currentUser.user.isAdmin === true ? "" : "d-none"}`} to='/admin'></Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 border-bottom pt-2 pb-2 mb-4">
                    <span className="">
                        <i className="fas fa-plus fa-2x mr-3 text-muted align-middle" onClick={() => actions.getDate()} data-toggle="modal" data-target="#ModalUserCrearNota"></i>
                        <label className="text-muted pt-2 align-middle">Nueva nota</label>
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <ul>
                        {!!store.notes.length > 0 &&
                            store.notes.map((item, i) => {
                                if(item.agenda.title===store.currentAgenda.title){
                                return (
                                    <li key={i} className="border-bottom text-muted d-flex justify-content-between pt-2 pb-2">
                                        <Link to='/note' className='text-muted' onClick={()=>actions.getNote(props.history, '/api/notes/', item.id)} >{item.title}</Link>
                                        <span>
                                            <i className="fas fa-trash-alt mr-3" onClick={() => actions.DeleteNote('/api/notes/', item.id)}></i>
                                            <i className="fas fa-pencil-alt mr-3" id={item.id} onClick={e => actions.getNoteId(e)} data-toggle="modal" data-target="#ModalUserModificarNota"></i>
                                        </span>
                                    </li>)
                            }})
                        }
                    </ul>
                </div>
            </div>
            <ModalUserModificarAgenda />
            <ModalUserCrearNota />
            <ModalUserModificarNota />
        </div>
    )
}

export default Agenda