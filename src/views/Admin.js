import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import ModalAdminModificarUser from '../components/ModalAdminModificarUser'

const Admin = props => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <div className="row pt-5 mb-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 form-group d-flex justify-content-between border-bottom text-muted">
                    <h5 className="text-muted">Panel de administración</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <ul>
                        {!!store.users.length > 0 &&
                            store.users.map((item, i) => {
                                return(
                                <li key={i} className="border-bottom text-muted d-flex justify-content-between pt-2 pb-2">
                                    <div className="col-md-4">
                                        {item.fullname}
                                    </div>
                                    <div className="col-md-7">
                                        {item.username}
                                    </div>
                                    <div className="col-md-1 d-flex justify-content-end"> 
                                        <i id={i} onClick={e => actions.idUser(e)}  className="fas fa-pencil-alt" data-toggle="modal" data-target="#ModalAdminModificarUser"></i>                                   
                                    </div>
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <ModalAdminModificarUser />
        </div>
    )
}

export default Admin