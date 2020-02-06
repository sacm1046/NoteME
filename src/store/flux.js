const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            ///////////Fetch Login and Signup//////////////////
            path: 'http://localhost:5000',
            msg: '',
            aviso: '',
            username: '',
            password: '',
            phone: '',
            fullname: '',
            currentUser: {},
            error:"",
        },
        actions: {
            postSignup: (history) => {
                const store = getStore();
                const data = {
                    username: store.username,
                    fullname: store.fullname,
                    phone: store.phone,
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
                        setStore({
                            username: '',
                            fullname: '',
                            phone: '',
                            password: '',
                            currentUser: data
                        });
                        history.push('/')
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
                            setStore({error:data})
                        }
                        else {
                            setStore({
                                username: '',
                                password: '',
                                currentUser: data
                            });
                            history.push('/signup')
                        }
                    })
            },
            handleChange: e => {
                setStore({ [e.target.name]: e.target.value })
            },
        }
    }
}
export default getState;