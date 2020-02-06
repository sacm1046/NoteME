import React from 'react'
import { Context } from '../store/appContext'
import Calendar from 'react-calendar'
import moment from 'moment'

class BaseCalendar extends React.Component {
    state = {
        date: new Date(),
        fechaActual: "",
        lunes: "",
        martes: "",
        miercoles: "",
        jueves: "",
        viernes: "",
        sabado: "",
        domingo: "",
    }
    onChange = date => this.setState({ date })
    getDay = date => {
        let a = new Date(date);
        this.setState({ fechaActual: this.Today(a) })
        this.setState({ lunes: moment(this.LunesOfWeek(a)).format('DD/MM/YYYY') })
        this.setState({ martes: moment(this.MartesOfWeek(a)).format('DD/MM/YYYY') })
        this.setState({ miercoles: moment(this.MiercolesOfWeek(a)).format('DD/MM/YYYY') })
        this.setState({ jueves: moment(this.JuevesOfWeek(a)).format('DD/MM/YYYY') })
        this.setState({ viernes: moment(this.ViernesOfWeek(a)).format('DD/MM/YYYY') })
        this.setState({ sabado: moment(this.SabadoOfWeek(a)).format('DD/MM/YYYY') })
        this.setState({ domingo: moment(this.DomingoOfWeek(a)).format('DD/MM/YYYY') })
    }
    Today = date => {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        return ((day < 10) ? ("0" + day) : day) + "/" + (((month + 1) < 10) ? ("0" + (month + 1)) : (month + 1)) + "/" + year
    }
    LunesOfWeek = (date) => {
        let diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }
    DomingoOfWeek = (date) => {
        let diff = date.getDate() - date.getDay() + (date.getDay() !== 0 ? 1 : -6);
        return new Date(date.setDate(diff + 6));
    }
    MartesOfWeek = (date) => {
        let diff = date.getDate() - date.getDay() + (date.getDay() !== 0 ? 1 : -6);
        return new Date(date.setDate(diff + 1));
    }
    MiercolesOfWeek = (date) => {
        let diff = date.getDate() - date.getDay() + (date.getDay() !== 0 ? 1 : -6);
        return new Date(date.setDate(diff + 2));
    }
    JuevesOfWeek = (date) => {
        let diff = date.getDate() - date.getDay() + (date.getDay() !== 0 ? 1 : -6);
        return new Date(date.setDate(diff + 3));
    }
    ViernesOfWeek = (date) => {
        let diff = date.getDate() - date.getDay() + (date.getDay() !== 0 ? 1 : -6);
        return new Date(date.setDate(diff + 4));
    }
    SabadoOfWeek = (date) => {
        let diff = date.getDate() - date.getDay() + (date.getDay() !== 0 ? 1 : -6);
        return new Date(date.setDate(diff + 5));
    }

    render() {
        return (
            <Context.Consumer>
                {
                    ({ store, actions }) => {
                        return (
                            <div className="container-fluid">
                                <div className="row pt-5">
                                    <div className="col-lg-3 col-12 d-flex justify-content-center">
                                        <Calendar
                                            onChange={this.onChange}
                                            value={this.state.date}
                                            onClickDay={this.getDay}
                                        />
                                    </div>
                                    <div className="col-lg-9 col-12 d-flex justify-content-center">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th scope="col"></th>
                                                        <th scope="col">Lunes</th>
                                                        <th scope="col">Martes</th>
                                                        <th scope="col">Miércoles</th>
                                                        <th scope="col">Jueves</th>
                                                        <th scope="col">Viernes</th>
                                                        <th scope="col">Sábado</th>
                                                        <th scope="col">Domingo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">Horarios</td>
                                                        <td className="text-center"><small>{this.state.lunes}</small></td>
                                                        <td className="text-center"><small>{this.state.martes}</small></td>
                                                        <td className="text-center"><small>{this.state.miercoles}</small></td>
                                                        <td className="text-center"><small>{this.state.jueves}</small></td>
                                                        <td className="text-center"><small>{this.state.viernes}</small></td>
                                                        <td className="text-center"><small>{this.state.sabado}</small></td>
                                                        <td className="text-center"><small>{this.state.domingo}</small></td>
                                                    </tr>
                                                    {!!store.calendario.length > 0 &&
                                                        store.calendario.map((item, i) => {
                                                            return (
                                                                <tr>
                                                                    <td className="text-center">{item.horario}</td>
                                                                    <td className="text-center">
                                                                        {!!store.time_cursos.length > 0 &&
                                                                            store.time_cursos.map((itemA, iA) => {
                                                                                if (itemA.hora === item.horario && itemA.fecha === this.state.lunes) {
                                                                                    console.log(itemA)
                                                                                    return <button className="btn-primary form-control mt-1" key={iA}>{itemA.curso}</button>
                                                                                }
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {!!store.time_cursos.length > 0 &&
                                                                            store.time_cursos.map((itemA, iA) => {
                                                                                if (itemA.hora === item.horario && itemA.fecha === this.state.martes) {
                                                                                    console.log(itemA)
                                                                                    return <button className="btn-primary form-control mt-1" key={iA}>{itemA.curso}</button>
                                                                                }
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {!!store.time_cursos.length > 0 &&
                                                                            store.time_cursos.map((itemA, iA) => {
                                                                                if (itemA.hora === item.horario && itemA.fecha === this.state.miercoles) {
                                                                                    console.log(itemA)
                                                                                    return <button className="btn-primary form-control mt-1" key={iA}>{itemA.curso}</button>
                                                                                }
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td className="text-center">
                                                                    {!!store.time_cursos.length > 0 &&
                                                                            store.time_cursos.map((itemA, iA) => {
                                                                                if (itemA.hora === item.horario && itemA.fecha === this.state.jueves) {
                                                                                    console.log(itemA)
                                                                                    return <button className="btn-primary form-control mt-1" key={iA}>{itemA.curso}</button>
                                                                                }
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td className="text-center">
                                                                    {!!store.time_cursos.length > 0 &&
                                                                            store.time_cursos.map((itemA, iA) => {
                                                                                if (itemA.hora === item.horario && itemA.fecha === this.state.viernes) {
                                                                                    console.log(itemA)
                                                                                    return <button className="btn-primary form-control mt-1" key={iA}>{itemA.curso}</button>
                                                                                }
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td className="text-center">
                                                                    {!!store.time_cursos.length > 0 &&
                                                                            store.time_cursos.map((itemA, iA) => {
                                                                                if (itemA.hora === item.horario && itemA.fecha === this.state.sabado) {
                                                                                    console.log(itemA)
                                                                                    return <button className="btn-primary form-control mt-1" key={iA}>{itemA.curso}</button>
                                                                                }
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td className="text-center">
                                                                    {!!store.time_cursos.length > 0 &&
                                                                            store.time_cursos.map((itemA, iA) => {
                                                                                if (itemA.hora === item.horario && itemA.fecha === this.state.domingo) {
                                                                                    console.log(itemA)
                                                                                    return <button className="btn-primary form-control mt-1" key={iA}>{itemA.curso}</button>
                                                                                }
                                                                            })
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <ModalUser />
                            </div>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}

export default BaseCalendar;