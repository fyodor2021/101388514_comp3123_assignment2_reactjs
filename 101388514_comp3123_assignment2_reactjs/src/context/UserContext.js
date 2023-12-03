import React ,{createContext, useState} from 'react'
import universalCookies from 'universal-cookie';
import jsCookies from 'js-cookie';
const UserContext  = createContext();
function UserProvider({children}) {
    const [token, setToken] = useState('')
    const universalCookie = new universalCookies()
    const handleLogout = () => {
        const tokenValueCookie = jsCookies.get('token')
        universalCookie.set('token',tokenValueCookie,{ expires: new Date(Date.now() - 600000000)})
        setToken('')
    }
    const providedValues = {
        tokenValue:[token, setToken],
        handleLogout
    }
    return <UserContext.Provider value={providedValues}>
        {children}
    </UserContext.Provider>
}
export {UserProvider};
export default UserContext;