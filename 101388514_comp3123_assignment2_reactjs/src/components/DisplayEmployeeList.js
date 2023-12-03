import { useContext, useEffect, useState } from 'react'

import axios from 'axios'
import EmployeeList from './EmployeeList'
import Cookies from 'js-cookie'
import { decryptData } from '../tokenDecryption'
import EmployeeContext from '../context/EmployeeContext'
import ViewEmployee from './ViewEmployee'
function DisplayEmployee() {
    const { employeeList, employeeChanged, empId, addMessage } = useContext(EmployeeContext)
    const [employees, setEmployees] = employeeList
    const [updateEmployees] = employeeChanged
    const [empIdToView] = empId
    const [message] = addMessage


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BASEURL + "emp/employees", {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `jwt ${decryptData(Cookies.get('token'))}`
                    }
                });
                setEmployees(response.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData(); 

    }, [updateEmployees,message])
    const findEmployee = (empIdToView) => {
        return employees.filter(employee => employee._id === empIdToView)
    }
    const employee = findEmployee(empIdToView);
    return <div style={{ display: 'flex', width: '64%' }}>
    {!empIdToView ? <EmployeeList employees={employees}></EmployeeList> :
        <ViewEmployee employee={employee}/>}
        
    </div>
}

export default DisplayEmployee;