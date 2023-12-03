import './App.css'
import { decryptData } from '../tokenDecryption'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useContext, useState } from 'react'
import EmployeeContext from '../context/EmployeeContext'
import AddEmpolyee from './AddEmployee'

function EmployeeShow({ employee}) {
    const {edit, updateById, employeeChanged, empId } = useContext(EmployeeContext)
    const [editShow, setEditShow] = useState(false)
    const [updateEmployees, setUpdateEmployees] = employeeChanged
    const [empIdToView,setEmpIdToView] = empId
    const {addMessage} = useContext(EmployeeContext)
    const [message, setMessage] = addMessage
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const handleDeleteClick = async () => {
        const response = await axios.delete(process.env.REACT_APP_BASEURL + "emp/employees?eid=" + employee._id, {
            headers: {
                "Authorization": `jwt ${decryptData(Cookies.get('token'))}`
            }
        }
        )
            setUpdateEmployees(!updateEmployees)
    }
    const toggleShowEdit = async () => {
        setEditShow(!editShow)
    }
    const handleViewClick = () => {
        setEmpIdToView(employee._id)
    }
    const handleUpdateClick = async () => {

            const firstName = fname == '' || fname.length < 3 ? employee.first_name: fname;
            const lastName = lname == '' || lname.length  < 3 ? employee.last_name: lname;
            const emailAddress = email == '' || email.length  < 5 ? employee.eamil: email;
            if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAddress)){
                updateById(employee._id, firstName,lastName,emailAddress)
                setEditShow(!editShow)
                setMessage('')
            }else{
                setEditShow(!editShow)
                setFname(employee.first_name)
                setLname(employee.last_name)
                setEmail(employee.email)
                setMessage('invalid Entry');

            }


    }
    const handleFnameChange = (event) => {
        setFname(event.target.value)
    }
    const handleLnameChange = (event) => {
        setLname(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    return <tr className=''>
        {editShow ? <><td className='employee-text-item'>
            <input value={fname} onChange={handleFnameChange}  className='update-inputs' type='text' placeholder={employee.first_name} />
        </td>
            <td className='employee-text-item'>
                <input  value={lname} onChange={handleLnameChange} className='update-inputs' type='text' placeholder={employee.last_name} />
            </td>
            <td className='employee-text-item'>
                <input  value={email} onChange={handleEmailChange}  className='update-inputs' type='text' placeholder={employee.email} />
            </td></> : <><td className='employee-text-item'>
                {employee.first_name}
            </td>
            <td className='employee-text-item'>
                {employee.last_name}
            </td>
            <td className='employee-text-item'>
                {employee.email}
            </td></>}

        <td className='employee-crud-buttons-container'>
            <div>
                <button onClick={editShow ? handleUpdateClick : toggleShowEdit} className='employee-buttons button-text'>Update</button>
            </div>
            <div>
                <button onClick={handleDeleteClick} className='employee-buttons button-text' style={{ backgroundColor: '#ff5151' }}>Delete</button>
            </div>
            <div>
                <button onClick={handleViewClick} className='employee-buttons button-text'>View</button>
            </div>
        </td>
    </tr>



}
export default EmployeeShow;