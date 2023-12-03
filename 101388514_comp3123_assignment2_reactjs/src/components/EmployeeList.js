import EmployeeShow from './EmployeeShow'
import './App.css'
import { useContext, useState } from 'react'
import AddEmployee from './AddEmployee'
import EmployeeContext from '../context/EmployeeContext'

export default function EmployeeList({ employees }) {
    const { add, addMessage } = useContext(EmployeeContext)
    const [addIsVisible, setAddIsVisible] = add
    const [message] = addMessage
    const renderedEmpList = employees.map((employee, key) => {
        return <EmployeeShow employee={employee} key={employee._id} />
    })
    const toggleAddEmp = () => {
        setAddIsVisible(!addIsVisible)
    }

    return <div className="form-container">
        {addIsVisible ? <AddEmployee />
            : <table>
                <tr><div style={{display:'flex', flexDirection:'column'}}>
                    <button className='add-employee-button' onClick={toggleAddEmp}>Add Employee</button>
                    <div style={{marginLeft: 25, marginBottom: 10, color:'red'}}>{message}</div>

                </div>

                </tr>
                <tr>
                    <th className='employee-text-item'><div>Employee First Name</div></th>
                    <th className='employee-text-item'><div>Employee Last Name</div></th>
                    <th className='employee-text-item'><div>Employee Email ID</div></th>
                    <th className='employee-text-item'><div>Actions</div></th>
                </tr>
                {renderedEmpList}
            </table>}
    </div>
}