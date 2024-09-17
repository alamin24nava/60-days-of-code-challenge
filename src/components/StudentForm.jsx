import { useDispatch, useSelector } from "react-redux";
import { studentCreate, changeName,updatedStudent } from "../features/student_attendances/studentAttendancesSlice";
const StudentForm = ()=>{
    const {studentName, editableStudent} = useSelector((state)=>state.attendance)
    const dispatch = useDispatch()

    const handleStudentName =(e)=>{
        dispatch(changeName(e.target.value))
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        if (studentName.trim() === '') {
            return alert('Please Provide your name')
        }
        const newStudent = {
            id: Date.now()+'',
            name:studentName,
            isPresent:undefined,
        }
        
        editableStudent !== null ? dispatch(updatedStudent(studentName)):dispatch(studentCreate(newStudent))
    }
    return(
        <form onSubmit={handleSubmit} className="w-25 mx-auto my-5">
            <input onChange={handleStudentName} value={studentName} type="text" className="form-control mb-2" placeholder="Enter Name"/>
            <button className="btn btn-primary w-100" type="submit">{editableStudent !== null ? 'Update Student':'Add Student'}</button>
        </form>
    )
}
export default StudentForm