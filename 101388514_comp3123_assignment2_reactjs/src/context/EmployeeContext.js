import React, { createContext, useState } from 'react'
import { decryptData } from '../tokenDecryption';
import axios from 'axios';
import Cookies from 'js-cookie';
const EmployeeContext = createContext();
function EmployeeProvider({ children }) {
    const [addIsVisible, setAddIsVisible] = useState(false)
    const [editIsVisible, setEditIsVisible] = useState(false)
    const [employees, setEmployees] = useState([])
    const [updateEmployees, setUpdateEmployees] = useState(false)
    const [empIdToView, setEmpIdToView] = useState()
    const [message, setMessage] = useState('')

    const updateById = async (id,fname,lname,email) => {
        const response = await axios.put(process.env.REACT_APP_BASEURL + "emp/employees/" + id, {
            first_name: fname,
            last_name: lname,
            email: email
        }, {
            headers: {
                "Authorization": `jwt ${decryptData(Cookies.get('token'))}`
            }
            
        })
        console.log(response)
        if(response.status == 200){
            setUpdateEmployees(!updateEmployees)
        }
    }

    const provicedValues = {
        add: [addIsVisible, setAddIsVisible],
        edit: [editIsVisible, setEditIsVisible],
        employeeList: [employees, setEmployees],
        employeeChanged: [updateEmployees, setUpdateEmployees],
        empId: [empIdToView, setEmpIdToView],
        updateById,
        addMessage: [message, setMessage],
      };


    return <EmployeeContext.Provider value={provicedValues}>
        {children}
    </EmployeeContext.Provider>
}
export { EmployeeProvider };
export default EmployeeContext;