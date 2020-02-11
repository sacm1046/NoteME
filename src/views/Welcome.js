import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import { Link } from 'react-router-dom'

const Welcome = props => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if (store.isAuthenticated === false) {
            actions.goLogin(props.history)
        }
    }, [])
    return (
        <div className="container">
            <div className="row pt-5 mb-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 form-group d-flex justify-content-between border-bottom text-muted">
                    <h5 className="text-muted">Bienvenido {store.isAuthenticated === false ? "" : store.currentUser.user.fullname}</h5>
                    <Link className={`fas fa-cog mr-3 text-muted ${store.isAuthenticated === false ? "" : store.currentUser.user.isAdmin === true ? "" : "d-none"}`} to='/admin'></Link>
                </div>
            </div>
            {!!store.agendas.length > 0 &&
                store.agendas.map((item, i) => {
                    if (store.currentUser.user.id === item.user.id) {
                        if (item) {
                            store.showWelcome = "d-none"
                            return (
                                <div className='row' key={i} >
                                    <div className="col-md-3"></div>
                                    <div className="col-md-6 from-group">
                                        <button className="btn btn-primary form-control mt-2" onClick={() => actions.getAgenda(props.history, '/api/agendas/', store.currentUser.user.id)}>Ir a mi agenda</button>
                                    </div>
                                </div>
                            )
                        }
                    }
                })
            }

            <div className={`row ${store.showWelcome}`} >
                <div className="col-md-3"></div>
                <div className="col-md-6 from-group">
                    <label className="d-block text-muted form-label">Asigne un nombre a su agenda</label>
                    <input type="text" name="titleAgenda" className="form-control" onChange={e => actions.handleChange(e)} />
                    <button className="btn btn-primary form-control mt-2" onClick={() => actions.postAgenda(props.history)}>Crear agenda</button>
                </div>
            </div>
        </div>
    )
}

export default Welcome