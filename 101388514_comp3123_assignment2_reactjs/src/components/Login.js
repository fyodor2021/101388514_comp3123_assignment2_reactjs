import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Crypto from 'crypto-js'
import './App.css'
import { tokenEncryption } from '../tokenDecryption'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
function Login({ onLogin }) {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [message, setMessage] = useState('')
    const {tokenValue} = useContext(UserContext)
    const [token,setToken] = tokenValue
    const [registerVisible, setRegisterVisible] = useState(false)
    const cookies = new Cookies();
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleUserChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmitLogin = async (event) => {
        event.preventDefault()
        try{if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && password.length > 5) {
            event.preventDefault();
            const response = await axios.post(process.env.REACT_APP_BASEURL + 'user/login', {
                email,
                password
            })
            if (response.status == 200) {
                setToken(tokenEncryption(response.data.token))
                setMessage(response.data.message)
            }

        } else {
            setMessage("invalid Username or Password.")
        }}catch(e){
            setMessage(e.response.data.message)

        }


    }


    const handleToggleRegister = () => {
        setMessage('')
        setRegisterVisible(!registerVisible)

    }


    const handleSubmitRegister = async (event) => {
        event.preventDefault()
        try{if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && password.length > 5 && username.length > 3) {
            const response = await axios.post(process.env.REACT_APP_BASEURL + 'user/signup', {
                username,
                email,
                password
            })
                if (response.status == 201) {
                    setMessage(response.data.message)
                    setRegisterVisible(false)
                }else if (response.data.code == 11000) {
                    setMessage('user already exists')
                }

        } else {
            setMessage('invalid Username or Password.')
        }}catch(e){
            setMessage(e.response.data.message)

        }
    }
    useEffect(() => {
        if (token != '') {
            cookies.set('token', token, { path: '/', expires: new Date(Date.now() + 600000000), secure: false })
            onLogin();
        }
    }, [token])
    return <div style={{ width: '100%' }}>
        {!registerVisible ?
            <form onSubmit={handleSubmitLogin} className="form-horizontal login-form">
                <div className='form-element-container'>

                    <div className="form-group input-label-group-login">
                        <div><h1>Login</h1></div>

                        <label className="control-label col-sm-2" style={{ margin: 10 }} htmlFor="email">Email:<span style={{ color: 'red' }}>*</span></label>
                        <div className="col-sm-10">
                            <input value={email} onChange={handleEmailChange} type='email' className="form-control" placeholder="Email Address" />
                        </div>
                    </div>
                    <div className="form-group input-label-group-login">
                        <label className="control-label col-sm-2" style={{ margin: 10 }} htmlFor="pwd">Password:<span style={{ color: 'red' }}>*</span></label>
                        <div className="col-sm-10">
                            <input value={password} onChange={handlePasswordChange} className="form-control" type='password' name='pwd' placeholder='Password' />
                        </div>
                    </div>
                    <div style={{ marginLeft: 20, color: 'red' }}>
                        <span>{message}</span>
                    </div>
                    <div className="form-group input-label-group-login">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button onClick={handleSubmitLogin} className="btn btn-default btn-success" style={{ marginRight: 20, width: 100 }}>Login</button>
                            <button onClick={handleToggleRegister} className="btn btn-default btn-success" style={{ marginRight: 20, width: 100 }}>Register</button>
                        </div>
                    </div>
                </div>
            </form> : <form onSubmit={handleSubmitRegister} className="form-horizontal login-form">
                <div className='form-element-container'>
                    <div className="form-group input-label-group-login">
                        <div><h1>Register</h1></div>

                        <label className="control-label" style={{ margin: 10 }} htmlFor="username">User Name: <span style={{ color: 'red' }}>*</span></label>
                        <div className="col-sm-10">
                            <input value={username} onChange={handleUserChange} type='email' className="form-control" placeholder="User Name" />
                        </div>
                    </div>
                    <div className="form-group input-label-group-login">
                        <label className="control-label col-sm-2" style={{ margin: 10 }} htmlFor="email">Email:<span style={{ color: 'red' }}>*</span></label>
                        <div className="col-sm-10">
                            <input value={email} onChange={handleEmailChange} type='email' className="form-control" placeholder="Email Address" />
                        </div>
                    </div>
                    <div className="form-group input-label-group-login">
                        <label className="control-label col-sm-2" style={{ margin: 10 }} htmlFor="pwd">Password:<span style={{ color: 'red' }}>*</span></label>
                        <div className="col-sm-10">
                            <input value={password} onChange={handlePasswordChange} className="form-control" type='password' name='pwd' placeholder='Password' />
                        </div>
                    </div>
                    <div style={{ marginLeft: 20, color: 'red' }}>
                        <span>{message}</span>
                    </div>
                    <div className="form-group input-label-group-login">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button onClick={handleToggleRegister} className="btn btn-default btn-success" style={{ marginRight: 20, width: 100 }}>Login</button>
                            <button onClick={handleSubmitRegister} className="btn btn-default btn-success" style={{ marginRight: 20, width: 100 }}>Register</button>
                        </div>
                    </div>
                </div>
            </form>}
    </div>
}

export default Login;