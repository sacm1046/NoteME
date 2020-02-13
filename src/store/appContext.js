import React, { Component } from 'react';
import getState from './flux';

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    class StoreWrapper extends Component {
        constructor(props) {
            super(props);
            //this will be passed as the contenxt value
            this.state = getState({
                getStore: () => this.state.store,
                getActions: () => this.state.actions,
                setStore: updatedStore =>
                    this.setState({
                        store: Object.assign(this.state.store, updatedStore)
                    })
            });
        }
        componentDidMount() {
            /**
             * EDIT THIS!
             * This function is the equivalent to "window.onLoad", it only run once on the entire application lifetime
             * you should do your ajax requests or fetch api requests here
             **/
            this.state.actions.isAuthenticated();
            if (this.state.store.isAuthenticated) {
                this.state.actions.getUsers('/api/users');
                this.state.actions.getAgendasUser('/api/agendas/user/', this.state.store.currentUser.user.id);
                this.state.actions.getNotesAgenda('/api/notes/user/', this.state.store.currentAgenda.id);
                this.state.actions.getTextsNotes('/api/texts/note/', this.state.store.currentNote.id)
                this.state.actions.getDate();
            }
        }
        render() {
            // the initial value for the context its not null anymore, but the current state of this component,
            // the context will have a getStore and setStore functions available then, because they were declared
            // on the state of this component
            return (
                <Context.Provider value={this.state}>
                    <PassedComponent {...this.props} />
                </Context.Provider>
            );
        }
    }
    return StoreWrapper;
}
export default injectContext;