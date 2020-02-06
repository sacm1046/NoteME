import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const Notebook = props => {
    const { store, actions } = useContext(Context);
    return (
        <h1>hola</h1>
    )
}

export default Notebook