import React from 'react';
//import { Context } from '../store/appContext';

const Note = props => {
    //const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <div className="row pt-5 mb-3">
                <div className="col-md-3"></div>
                <div className="col-md-5 form-group d-flex justify-content-between border-bottom text-muted">
                    <h5 className="text-muted">Nota</h5>
                    <i className="fas fa-pencil-alt mr-3"></i>
                </div>
                <div className="col-md-1 ml-1 form-group d-flex justify-content-between border-bottom text-muted">
                    <h5 className="text-muted">Fecha</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <ul>
                        <li className="border-bottom text-muted d-flex justify-content-between pt-2 pb-2">
                            PRUEBA 1
                        </li>
                        <li className="border-bottom text-muted d-flex justify-content-between pt-2 pb-2">
                            PRUEBA 2
                        </li>
                        <li className="border-bottom text-muted d-flex justify-content-between pt-2 pb-2">
                            PRUEBA 3
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row p-0">
                <div className="col-md-3"></div>
                <div className="col-md-6 d-flex justify-content-between bg-light pt-2">
                    <p className="pl-2 text-muted"><small>Agregar fotografías, textos o listas</small></p>
                    <span className="text-muted d-flex justify-content-end pt-1">
                        <i className="fas fa-camera mr-3"></i>
                        <i className="fas fa-file-alt mr-3"></i>
                        <i className="fas fa-list-alt mr-1"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Note