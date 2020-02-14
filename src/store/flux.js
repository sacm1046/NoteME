const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            ///////////Image////////////////
            show: false,
            urlImage: '',
            file: '',
            errorFile: null,
            currentFile: '',
            ///////////Texts////////////////
            content: "",
            url: "",
            errorText: null,
            time: "",
            currentText: '',
            currentTextId: '',
            Modal: '',
            ///////////Notes////////////////
            currentNote: {},
            updTitleNote: "",
            titleNote: '',
            date: '',
            errorNote: null,
            currentNoteId: '',
            ///////////Agendas////////////////
            currentAgenda: {},
            titleAgenda: '',
            errorAgenda: null,
            showWelcome: "",
            ///////////Users//////////////////
            checkAdmin: false,
            checkActive: true,
            errorUsers: null,
            currentUserId: "",
            currentUserAdmin: {},
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
            duplicate: '',
            ///////////Backend Tables//////////////////
            users: [],
            agendas: [],
            notes: [],
            texts: [],
        },
        actions: {
            /////////////General Functions//////////////
            handleChange: e => {
                setStore({ [e.target.name]: e.target.value })
            },
            handleCheck: e => {
                setStore({ [e.target.name]: e.target.checked })
            },
            getUserId: (e, fullname, isAdmin, active) => {
                let user = document.getElementById(e.target.id)
                let getId = user.id
                setStore({ currentUserId: getId })
                setStore({ currentUserAdmin: { fullname: fullname, isAdmin: isAdmin, active: active } })
            },
            getNoteId: (e) => {
                let note = document.getElementById(e.target.id)
                let getId = note.id
                setStore({
                    currentNoteId: getId,
                })

            },
            getDate: () => {
                let date = new Date()
                let day = date.getDate()
                let month = date.getMonth() + 1
                let year = date.getFullYear()
                let hour = date.getHours()
                let minutes = date.getMinutes()

                day = ((day < 10) ? ("0" + day) : day)
                month = ((month < 10) ? ("0" + month) : month)
                hour = ((hour < 10) ? ("0" + hour) : hour)
                minutes = ((minutes < 10) ? ("0" + minutes) : minutes)

                let today = day + '/' + month + '/' + year
                let hours = hour + ":" + minutes

                setStore({ date: today })
                setStore({ time: hours })
            },
            goLogin: (history) => {
                history.push('/')
            },
            Logout: () => {
                sessionStorage.removeItem('currentUser')
                sessionStorage.removeItem('isAuthenticated')
                setStore({
                    isAuthenticated: false,
                    currentUser: {},
                    agendas: [],
                })
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
                                errorSignup: '',
                                username: '',
                                fullname: '',
                                password: '',
                                frontpassword: '',
                                duplicate: '',
                                currentUser: data,
                            })
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
                        if (data.msg) {
                            setStore({ errorLogin: data })
                        }
                        else {
                            if (data.user.active === false) {
                                setStore({ errorLogin: "Usuario Bloqueado" })
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
                                getActions().getAgendasUser('/api/agendas/user/', store.currentUser.user.id)
                                setStore({
                                    currentAgenda: store.agendas[0]
                                })
                                history.push('/welcome')
                            }
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
                            });
                            getActions().getUsers('/api/users/')
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
            getAgendasUser: (url, idUser) => {
                const store = getStore();
                fetch(store.path + url + idUser, {
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
                            getActions().getAgendasUser('/api/agendas/user/', store.currentUser.user.id)
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
                            getActions().getNotesAgenda('/api/notes/user/', store.currentAgenda.id)
                            getActions().getTextsNotes('/api/texts/note/', store.currentNote.id)
                        }
                    })
            },
            /////////////Notes Functions//////////////
            getNote: (history, url, id) => {
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
                            currentNote: data,
                        })
                        setStore({ currentNoteId: id })
                        history.push('/note')
                    })
            },
            getNotesAgenda: (url, idAgenda) => {
                const store = getStore();
                fetch(store.path + url + idAgenda, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            notes: data,

                        })
                    })
            },
            postNotes: (url) => {
                const store = getStore();
                const data = {
                    title: store.titleNote,
                    date: store.date,
                    agenda_id: store.currentAgenda.id,
                }
                fetch(store.path + url, {
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
                            setStore({ errorNote: data })
                        }
                        else {
                            setStore({
                                titleNote: '',
                                errorNote: null,
                                currentNote: data,
                            });
                            getActions().getNotesAgenda('/api/notes/agenda/', store.currentAgenda.id)
                        }
                    })
            },
            putNote: (url, id) => {
                const store = getStore();
                const data = {
                    title: store.titleNote,
                    agenda_id: store.currentAgenda.id,
                }
                fetch(store.path + url + id, {
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
                            setStore({ errorNote: data })
                        }
                        else {
                            setStore({
                                titleNote: '',
                                errorNote: null,
                                currentNote: data, //!!!!!
                                updTitleNote: '',
                            });
                            getActions().getNotesAgenda('/api/notes/agenda/', store.currentAgenda.id)
                        }
                    })
            },
            DeleteNote: (url, id) => {
                const store = getStore();
                fetch(store.path + url + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data.msg)
                        if (data.msg) {
                            setStore({ errorNote: data })
                        }
                        else {
                            setStore({ currentNote: '' })
                            getActions().getNotesAgenda('/api/notes/agenda/', store.currentAgenda.id)
                        }
                    })
            },
            /////////////Texts Functions//////////////
            getText: (url, id) => {
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
                            currentText: data,
                            currentTextId: id
                        })
                    })
            },
            getTextsNotes: (url, idNote) => {
                const store = getStore();
                fetch(store.path + url + idNote, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            texts: data,

                        })
                    })
            },
            postTextContent: (url) => {
                const store = getStore();
                const data = {
                    time: store.time,
                    date: store.date,
                    content: store.content,
                    note_id: store.currentNote.id,
                }
                fetch(store.path + url, {
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
                            setStore({ errorText: data })
                        }
                        else {
                            setStore({
                                time: '',
                                content: '',
                                url: '',
                                errorText: null,
                                currentText: data,
                            });
                            getActions().getTextsNotes('/api/texts/note/', store.currentNote.id)
                        }
                    })
            },
            putTextContent: (url, id) => {
                const store = getStore();
                const data = {
                    content: store.content,
                    note_id: store.currentNote.id,
                }
                fetch(store.path + url + id, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {

                        if (data.msg) {
                            setStore({ errorNote: data })
                            console.log(data.msg)
                        }
                        else {
                            setStore({
                                content: '',
                                errorText: null,
                                currentText: data,
                            });
                            getActions().getTextsNotes('/api/texts/note/', store.currentNote.id)
                        }
                    })
            },
            postTextImage: (url1, url2) => {
                const store = getStore();
                const data = {
                    time: store.time,
                    date: store.date,
                    url: store.path + url2 + store.currentFile,
                    note_id: store.currentNote.id,
                }
                fetch(store.path + url1, {
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
                            setStore({ errorText: data })
                        }
                        else {
                            setStore({
                                time: '',
                                content: '',
                                url: '',
                                errorText: null,
                                currentText: data,
                                currentFile: "",
                                show: false,
                            });
                            getActions().getTextsNotes('/api/texts/note/', store.currentNote.id)
                        }
                    })
            },
            putTextImage: (url1, url2, id) => {
                const store = getStore();
                const data = {
                    url: store.path + url2 + store.currentFile,
                    note_id: store.currentNote.id,
                }
                fetch(store.path + url1 + id, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.msg) {
                            setStore({ errorText: data })
                            console.log(data.msg)
                        }
                        else {
                            setStore({
                                url: '',
                                errorText: null,
                                currentText: data,
                                currentFile: "",
                                show: false,
                            });
                            getActions().getTextsNotes('/api/texts/note/', store.currentNote.id)
                        }
                    })
            },
            DeleteText: (url, id) => {
                const store = getStore();
                fetch(store.path + url + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentUser.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data.msg)
                        if (data.msg) {
                            setStore({ errorText: data })
                        }
                        else {
                            setStore({ currentText: '' })
                            getActions().getTextsNotes('/api/texts/note/', store.currentNote.id)
                        }
                    })
            },
            /////////////Image Functions//////////////
            show: () => {
                setStore({ show: true })
            },
            postImg: (url) => {
                const store = getStore();

                let file = document.getElementById("inputFile")
                let data = new FormData();
                data.append('file', file.files[0]);
                setStore({ currentFile: file.files[0].name })
                console.log(store.currentFile)

                fetch(store.path + url, {
                    method: 'POST',
                    body: data,
                })
                    .then(resp => resp.json())
                    .then(data => { })
            },
            postImg_putTextImage: (url) => {
                const store = getStore();

                let file = document.getElementById("inputFilePut")
                let data = new FormData();
                data.append('file', file.files[0]);
                setStore({ currentFile: file.files[0].name })
                console.log(store.currentFile)

                fetch(store.path + url, {
                    method: 'POST',
                    body: data,
                })
                    .then(resp => resp.json())
                    .then(data => { })
            },
        }
    }
}
export default getState;