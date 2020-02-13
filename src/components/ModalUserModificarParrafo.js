import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'

const ModalUserModificarParrafo = props => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        document.getElementById('tt').value = store.currentText.content
    }, [store.currentText.content])
    return (
        <div className="modal fade" id="ModalUserModificarParrafo" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Modificar Párrafo
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div>
                        <div className="form-group modal-body">
                            <div className="d-flex justify-content-between">
                                <label className="d-block text-muted">Modifique su párrafo</label>
                            </div>         
                            <textarea name="content" id='tt' className="form-control" rows="5" cols="50" onChange={e => actions.handleChange(e)}></ textarea>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-success mr-1" data-dismiss="modal" onClick={() => actions.putTextContent('/api/texts/',store.currentTextId)}>Modificar</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalUserModificarParrafo