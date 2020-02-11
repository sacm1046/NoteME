import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import ModalAdminModificarUser from '../components/ModalAdminModificarUser'
import { Link } from 'react-router-dom'

const Admin = props => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if(store.isAuthenticated===false){
            actions.goLogin(props.history)}
        else{
            if(store.currentUser.user.isAdmin===false){
                actions.goLogin(props.history)}
        }
        
    }, [])
    return (
        <div className="container">
            <div className="row pt-5 mb-3">
                <div className="col-md-1"></div>
                <div className="col-md-10 form-group d-flex justify-content-between border-bottom text-muted">
                    <h5 className="text-muted">Panel de administración</h5>
                    <Link className='fas fa-caret-square-left mr-3 text-muted' to='/welcome' onClick={actions.getAgendas('/api/agendas')}></Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
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
                                return(
                                <li key={i} className="border-bottom text-muted d-flex justify-content-between pt-2 pb-2">
                                    <div className="col-md-2">
                                        {item.fullname}
                                    </div>
                                    <div className="col-md-4">
                                        {item.username}
                                    </div>
                                    <div className="col-md-2">
                                        {item.active===true?'activo':'bloqueado'}
                                    </div>
                                    <div className="col-md-2">
                                        {item.isAdmin===true?'admin':'normal'}
                                    </div>
                                    <div className="col-md-1 d-flex justify-content-end"> 
                                        <i id={item.id} onClick={e => actions.getUserId(e)}  className="fas fa-pencil-alt" data-toggle="modal" data-target="#ModalAdminModificarUser"></i>                                   
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