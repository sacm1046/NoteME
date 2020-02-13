import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'

const ModalAdminModificarUser = props => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
    }, [])
    return (
        <div className="modal fade" id="ModalAdminModificarUser" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Modificar Usuario
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div>
                        {!!store.users.length > 0 &&
                            store.users.map((item, i) => {     
                                if(parseInt(store.currentUserId) === item.id){
                                    return (
                                        <div key={i} className="form-group modal-body">
                                            <label className="d-block text-muted">Nombre</label>
                                            <input type="text" id="inputUserFullname" name="fullname" className="form-control" onChange={e => actions.handleChange(e)} defaultValue={store.currentUserAdmin.fullname}/>
                                            <label className="d-block text-muted">Poner como administrador</label>
                                            <input type="checkbox" id="checkUserAdmin" defaultChecked={store.currentUserAdmin.isAdmin} name="checkAdmin" className="" onClick={e => actions.handleCheck(e)} />
                                            <label className="d-block text-muted">Estado del usuario</label>
                                            <input type="checkbox" id="checkUserActive" defaultChecked={store.currentUserAdmin.active} name="checkActive" className="" onClick={e => actions.handleCheck(e)} />
                                        </div>
                                    )}
                            })
                        }
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-success mr-1" data-dismiss="modal" onClick={() => actions.putUsers('/api/users/')}>Modificar</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalAdminModificarUser