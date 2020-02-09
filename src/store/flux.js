const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            ///////////Agendas////////////////
            currentAgenda: {},
            titleAgenda: '',
            errorAgenda: "",
            ///////////Users//////////////////
            checkAdmin: false,
            checkActive: true,
            errorUsers: null,
            currentUserId: "",
            ///////////Fetch Login and Signup//////////////////
            path: 'http://localhost:5000',
            msg: '',
            aviso: '',
            username: '',
            password: '',
            frontpassword: '',
            fullname: '',
            currentUser: {},
            errorLogin: null,
            errorSignup: null,
            isAuthenticated: false,
            ///////////Backend Tables//////////////////
            users: [],
            agendas: [],
            notes: [],
            texts: [],
            lists: [],
            images: [],
            listlines: [],

        },
        actions: {
            /////////////General Functions//////////////
            handleChange: e => {
                setStore({ [e.target.name]: e.target.value })
            },
            handleCheck: e => {
                setStore({ [e.target.name]: e.target.checked })
            },
            idUser: e => {
                let user = document.getElementById(e.target.id)
                let getId = parseInt(user.id) + 1
                setStore({ currentUserId: getId })
            },
            preSetModalModUser: () => {
                document.getElementById("inputUserFullname").value = "prueba"
                document.getElementById("checkUserAdmin").checked = true;
                document.getElementById("checkUserActive").checked = true;
            },
            /////////////Login and Signup Functions//////////////
            postSignup: (history) => {
                const store = getStore();
                const data = {
                    username: store.username,
                    fullname: store.fullname,
                    password: store.password,
                }
                fetch(store.path + '/register', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ errorSignup: data })
                        }
                        else {
                            setStore({
                                username: '',
                                fullname: '',
                                password: '',
                                frontpassword: '',
                                currentUser: data
                            });
                            history.push('/')
                        }
                    })
            },
            postLogin: (history) => {
                const store = getStore();
                const data = {
                    username: store.username,
                    password: store.password,
                }
                fetch(store.path + '/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data.msg)
                        if (data.msg) {
                            setStore({ errorLogin: data })
                        }
                        else {
                            setStore({
                                username: '',
                                password: '',
                                errorLogin: null,
                                currentUser: data,
                                isAuthenticated: true
                            });
                            sessionStorage.setItem('currentUser', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticated', true)
                            getActions().getUsers('/api/users')
                            getActions().getAgendas('/api/agendas')
                            history.push('/welcome')
                            console.log(store.agendas.length)
                        }
                    })
            },
            isAuthenticated: () => {
                if (sessionStorage.getItem('currentUser') && sessionStorage.getItem('isAuthenticated')) {
                    setStore({
                        isAuthenticated: sessionStorage.getItem('isAuthenticated'),
                        currentUser: JSON.parse(sessionStorage.getItem('currentUser'))
                    })
                }
            },
            /////////////Users Functions//////////////
            getUsers: (url) => {
                const store = getStore();
                fetch(store.path + url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            users: data
                        })
                    })
            },
            putUsers: (url) => {
                const store = getStore();
                const data = {
                    fullname: store.fullname,
                    active: store.checkActive,
                    isAdmin: store.checkAdmin,
                }
                fetch(store.path + url + store.currentUserId, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data.msg)
                        if (data.msg) {
                            console.log(data.msg)
                            setStore({ errorUsers: data })
                        }
                        else {
                            setStore({
                                fullname: '',
                                errorUsers: null,
                                checkActive: true,
                                checkAdmin: false,
                                currentUser: data,
                            });
                            getActions().getUsers('/api/users')
                        }
                    })
            },
            /////////////Agendas Functions//////////////
            getAgenda: (history, url, id) => {
                const store = getStore();
                fetch(store.path + url + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            currentAgenda: data,
                        })
                        history.push('/agenda')
                    })
            },
            getAgendas: (url) => {
                const store = getStore();
                fetch(store.path + url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            agendas: data,
                        })
                    })
            },
            postAgenda: (history) => {
                const store = getStore();
                const data = {
                    title: store.titleAgenda,
                    user_id: store.currentUser.user.id,
                }
                fetch(store.path + '/api/agendas', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data.msg)
                        if (data.msg) {
                            setStore({ errorAgenda: data })
                        }
                        else {
                            setStore({
                                titleAgenda: '',
                                errorAgenda: null,
                                currentAgenda: data,
                            });
                            history.push('/agenda')
                            getActions().getAgendas('/api/agendas')
                        }
                    })
            },
            putAgenda: (url) => {
                const store = getStore();
                const data = {
                    title: store.titleAgenda,
                    user_id: store.currentUser.user.id,
                }
                fetch(store.path + url + store.currentAgenda.id, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data.msg)
                        if (data.msg) {
                            setStore({ errorAgenda: data })
                        }
                        else {
                            setStore({
                                titleAgenda: '',
                                errorAgenda: null,
                                currentAgenda: data,
                            });
                            getActions().getAgendas('/api/agendas')
                        }
                    })
            },
            /////////////Notes Functions//////////////
            getNotes: (url) => {
                const store = getStore();
                fetch(store.path + url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            notes: data
                        })
                    })
            },
            /////////////Texts Functions//////////////
            getTexts: (url) => {
                const store = getStore();
                fetch(store.path + url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            texts: data
                        })
                    })
            },
            /////////////Lists Functions//////////////
            getListas: (url) => {
                const store = getStore();
                fetch(store.path + url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            lists: data
                        })
                    })
            },
            /////////////List Lines Functions//////////////
            getListlines: (url) => {
                const store = getStore();
                fetch(store.path + url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            listlines: data
                        })
                    })
            },
            /////////////Images Functions//////////////
            getImages: (url) => {
                const store = getStore();
                fetch(store.path + url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            images: data
                        })
                    })
            },
        }
    }
}
export default getState;