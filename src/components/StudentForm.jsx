import { useContext } from "react";
import { StudentContext } from "../contexs/Student";

const StudentForm = ()=>{
    const {handleSubmit, handleStudentName, studentName,msg, editMode} = useContext(StudentContext)
    return(
        <form onSubmit={handleSubmit} className="w-25 mx-auto my-5">
            <input onChange={handleStudentName} value={studentName} type="text" className="form-control mb-2" placeholder="Enter Name"/>
            <p className="text-danger">{msg}</p>
            <button className="btn btn-primary w-100" type="submit">{editMode ? 'Update Student':'Add Student'}</button>
        </form>
    )
}
export default StudentForm