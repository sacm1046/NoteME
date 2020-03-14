import React, { useContext } from 'react'
import { Context } from '../store/appContext'

const ModalUserModificarImage = props => {
    const { store, actions } = useContext(Context);
    return (
        <div className="modal fade" id="ModalUserModificarImage" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Modificar imagen
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div>
                        <div className="form-group modal-body">
                            <div className="d-flex justify-content-center pt-2 input-group">
                                <div className="custom-file" onClick={()=>actions.show()}>
                                    <input type="file" className="custom-file-input" id="inputFilePut" aria-describedby="inputGroupFileAddon03" />
                                    <label className="custom-file-label" for="inputGroupFile03">Seleccione Imagen</label>
                                  
                                </div>
                                <div className="input-group-append">
                                    <button onClick={store.show===false?null:() => actions.postImg_putTextImage('/upload')} className="btn btn-success">Subir Imagen</button>
                                </div>
                            </div>
                            <div className=''><small className="text-muted">{store.currentFile === "" ? "" : store.currentFile}</small></div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-success mr-1" data-dismiss="modal" onClick={() => actions.putTextImage('/api/texts/','/upload/',store.currentTextId)}>Modificar</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalUserModificarImage