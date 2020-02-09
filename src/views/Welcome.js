import React, { useContext } from 'react'
import { Context } from '../store/appContext'

const Welcome = props => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <div className="row pt-5 mb-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 form-group d-flex justify-content-between border-bottom text-muted">
                    <h5 className="text-muted">Bienvenido {store.currentUser.user.fullname}</h5>
                </div>
            </div>
            <div className={`row ${store.agendas.length>0?'d-none':''}`}>
                <div className="col-md-3"></div>
                <div className="col-md-6 from-group">
                    <label className="d-block text-muted form-label">Asigne un nombre a su agenda</label>
                    <input type="text" name="titleAgenda" className="form-control" onChange={e => actions.handleChange(e)} />
                    <button className="btn btn-primary form-control mt-2" onClick={() => actions.postAgenda(props.history)}>Crear agenda</button>
                </div>
            </div>
            <div className={`row ${store.agendas.length>0?'':'d-none'}`}>
                <div className="col-md-3"></div>
                <div className="col-md-6 from-group">
                    <button className="btn btn-primary form-control mt-2" onClick={() => actions.getAgenda(props.history,'/api/agendas/',1)}>Ir a mi agenda</button>
                </div>
            </div>
        </div>
    )
}

export default Welcome