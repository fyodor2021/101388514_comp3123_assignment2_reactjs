import { useContext } from 'react'
import './App.css'
import EmployeeContext from '../context/EmployeeContext'

function Employee({employee}){
    const {empId,addMessage} = useContext(EmployeeContext)
    const [empIdToView, setEmpIdToView] = empId
    const [message,setMessage] = addMessage
    const handleBackClick = () => {
        setEmpIdToView(null)
        setMessage('')
    }
    return <div className='view-container'>
    <div><h1>View Employee Details</h1></div>
    <div className="view-info-container">
        <label className="view-text" htmlFor="firstname">First Name:</label>
        <div className="view-text">
            {employee[0].first_name}
        </div>
    </div>
    <div className="view-info-container">
        <label className="view-text" htmlFor='lastname'>Last Name:</label>
        <div className="view-text">
        {employee[0].last_name}
        </div>
    </div>
    <div className="view-info-container">
        <label className="view-text" htmlFor="email">Email:</label>
        <div className="view-text">
        {employee[0].email}
        </div>
    </div>
    <div>
        <button onClick={handleBackClick} className='btn btn-primary'>Back</button>
    </div>
</div>
}
export default Employee;