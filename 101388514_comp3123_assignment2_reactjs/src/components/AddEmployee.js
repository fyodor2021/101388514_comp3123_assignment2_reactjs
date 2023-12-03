import { useContext, useState } from 'react'
import { decryptData } from '../tokenDecryption'
import axios from 'axios'
import Cookies from 'js-cookie'
import EmployeeContext from '../context/EmployeeContext'
function AddEmpolyee() {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const { add, employeeChanged } = useContext(EmployeeContext)
    const [addIsVisible, setAddIsVisible] = add
    const [updateEmployees, setUpdateEmployees] = employeeChanged
    const handleFnameChange = (event) => {
        setFname(event.target.value)
    }
    const handleLnameChange = (event) => {
        setLname(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleSaveClick = async (event) => {
        event.preventDefault()
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            const response = await axios.post(process.env.REACT_APP_BASEURL + "emp/employees", {
                first_name: fname,
                last_name: lname,
                email: email
            }, {
                headers: {
                    "Authorization": `jwt ${decryptData(Cookies.get('token'))}`
                }
            })
            if (response.status == 201) {
                setAddIsVisible(!addIsVisible)
                setUpdateEmployees(!updateEmployees)
            }
        }else{
            setMessage('validation failed')
        }
        

    }
    return <form className="form-horizontal " style={{ width: '75%' }}>
        <div className="form-group input-label-group">
            <label className="control-label col-sm-2" htmlFor="firstname">First Name:</label>
            <div className="col-sm-10">
                <input value={fname} onChange={handleFnameChange} className="form-control" name='firstname' placeholder='First Name' />
            </div>
        </div>
        <div className="form-group input-label-group">
            <label className="control-label col-sm-2" htmlFor='lastname'>Last Name:</label>
            <div className="col-sm-10">
                <input value={lname} onChange={handleLnameChange} className="form-control" name='lastname' placeholder="Last Name" />
            </div>
        </div>
        <div className="form-group input-label-group">
            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
            <div className="col-sm-10">
                <input value={email} onChange={handleEmailChange} type='email' className="form-control" placeholder="Email Address" />
            </div>
        </div>
        <div className='input-label-group' style={{color: 'red'}}>{message}</div>
        <div className="form-group input-label-group">
            <div className="col-sm-offset-2 col-sm-10">
                <button onClick={handleSaveClick} className="btn btn-default btn-success" style={{ marginRight: 20 }}>Save</button>
                <button onClick={() => { setAddIsVisible(!addIsVisible) }} className="btn btn-default btn-danger">Cancel</button>
            </div>
        </div>
        
    </form>
}
export default AddEmpolyee;