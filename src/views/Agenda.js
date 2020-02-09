import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import ModalUserModificarAgenda from '../components/ModalUserModificarAgenda'

const Agenda = props => {
    const { store } = useContext(Context);
    return (
        <div className="container">
            <div className="row pt-5 mb-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 form-group d-flex justify-content-between border-bottom text-muted">
                    <div className="">
                        <h5 className="text-muted">Agenda {store.currentAgenda.title}</h5>
                    </div>
                    <i className="fas fa-pencil-alt mr-3" data-toggle="modal" data-target="#ModalUserModificarAgenda"></i>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 border-bottom pt-2 pb-2 mb-4">
                    <span className="">
                        <i className="fas fa-plus fa-2x mr-3 text-muted align-middle"></i>
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
                                return (
                                    <li key={i} className="border-bottom text-muted d-flex justify-content-between pt-2 pb-2">
                                            {item.title}
                                        <span>
                                            <i className="fas fa-trash-alt mr-3"></i>
                                            <i className="fas fa-pencil-alt mr-3"></i>
                                        </span>
                                    </li>)
                            })
                        }
                    </ul>
                </div>
            </div>
            <ModalUserModificarAgenda/>
        </div>
    )
}

export default Agenda