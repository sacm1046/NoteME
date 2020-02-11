import React, { useContext } from 'react'
import { Context } from '../store/appContext'

const ModalUserSubirImage = props => {
    const { store, actions } = useContext(Context);
    return (
        <div className="modal fade" id="ModalUserSubirImage" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Subir imagen
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div>
                        <div className="form-group modal-body">
                            <div className="d-flex justify-content-end">
                                <label className="d-block text-muted">Fecha: {store.date} - Hora: {store.time}</label>
                            </div>
                            <div className="d-flex justify-content-center pt-2 input-group">
                                          
                                        <input type="file" className="" id="inputFile"/>
                                        <button onClick={() => actions.postImg('/upload')} className="btn btn-success" id="fileButton">Button</button>    
                               
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-success mr-1" data-dismiss="modal" onClick={() => actions.postNotes('/api/notes')}>Insertar</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalUserSubirImage