import Login from './components/Login'
import DisplayEmployee from './components/DisplayEmployeeList'
import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.css'
import UserContext from './context/UserContext'
function App() {
        const [auth, setAuth] = useState(false)
        const {handleLogout, tokenValue} = useContext(UserContext)
        const [token,setToken] = tokenValue
        const handleLogin = () => {
                setAuth(true)
        }
        const handleLogoutClick = (event) => {
                event.preventDefault()
                handleLogout()
        }
        useEffect(() => {
                if (Cookies.get('token')) {
                        setAuth(true)
                }else{
                        setAuth(false)
                }
        }, [token])
        
        return <div>
                <div>
                        <nav className="header"><h1>Employee Management App</h1>
                        {auth ? <button className='btn button-text' onClick={handleLogoutClick} style={{fontSize: 30 , backgroundColor: 'lightblue', color:'white'}}>Logout</button> : <></>}</nav>
                </div>
                <div className='page'>
                        {auth
                                ? <DisplayEmployee /> :
                                <Login onLogin={handleLogin} />
                        }

                </div>
        </div>



}


export default App;