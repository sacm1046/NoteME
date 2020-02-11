import React, { useContext } from 'react'
import { Context } from '../store/appContext'

const ModalUserCrearNota = props => {
    const { store, actions } = useContext(Context);
    return (
        <div className="modal fade" id="ModalUserCrearNota" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Crear Nota
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div>
                        <div className="form-group modal-body">
                            <div className="d-flex justify-content-between">
                                <label className="d-block text-muted">Asigne un nombre a su nota</label>
                                <label className="d-block text-muted">Fecha {store.date}</label>
                            </div>
                            <input type="text" name="titleNote" className="form-control" onChange={e => actions.handleChange(e)} />
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-success mr-1" data-dismiss="modal" onClick={() => actions.postNotes('/api/notes')}>Crear</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalUserCrearNota