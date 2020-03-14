import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import ModalAdminModificarUser from '../components/ModalAdminModificarUser'
import { Link } from 'react-router-dom'

const Admin = props => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if (store.isAuthenticated === false) {
            actions.goLogin(props.history)
        }
        else {
            if (store.currentUser.user.isAdmin === false) {
                actions.goLogin(props.history)
            }
        }

    }, [actions, props.history, store.isAuthenticated])
    return (
        <div className="container">
            <div className="row pt-5 ">
                <div className="col-md-1"></div>
                <div className="col-md-10 letter">
                    <div className="row mb-3">
                        <div className="col-md-12 form-group d-flex justify-content-between border-bottom text-muted">
                            <h5 className="text-muted">Panel de administración</h5>
                            <Link className='fas fa-caret-square-left mr-3 text-muted' to='/welcome' /* onClick={() => actions.getAgendasUser('/api/agendas/user/', store.currentUser.user.id)} */></Link>
                        </div>
                    </div>
                    <div className="row">
                        
                        <div className="col-md-12">
                            <ul>
                                <li className="border-bottom text-muted d-flex justify-content-between pt-2 pb-2">
                                    <div className="col-md-2">Nombre</div>
                                    <div className="col-md-4">Email</div>
                                    <div className="col-md-2">Estado</div>
                                    <div className="col-md-2">Rol Web</div>
                                    <div className="col-md-1"></div>
                                </li>
                                {!!store.users.length > 0 &&
                                    store.users.map((item, i) => {
                                        return (
                                            <li key={i} className="border-bottom text-muted d-flex justify-content-between pt-2 pb-2">
                                                <div className="col-md-2">
                                                    {item.fullname}
                                                </div>
                                                <div className="col-md-4">
                                                    {item.username}
                                                </div>
                                                <div className="col-md-2">
                                                    {item.active === true ? 'activo' : 'bloqueado'}
                                                </div>
                                                <div className="col-md-2">
                                                    {item.isAdmin === true ? 'admin' : 'normal'}
                                                </div>
                                                <div className="col-md-1 d-flex justify-content-end">
                                                    <i id={item.id} onClick={e => actions.getUserId(e, item.fullname, item.isAdmin, item.active)} className="fas fa-pencil-alt" data-toggle="modal" data-target="#ModalAdminModificarUser"></i>
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
                <div className="col-md-1 text-right">
                    <small onClick={() => actions.Logout()} className="text-danger font-weight-bold logout pt-1 pb-2 pl-3 pr-3 bg-light rounded-pill"><i className="fas fa-sign-out-alt text-danger"></i></small>
                </div>
            </div>

        </div>
    )
}

export default Admin