import { useDispatch, useSelector } from "react-redux"
import { deleteStudent,editStudent,manageStudent } from "../features/student_attendances/studentAttendancesSlice"
const StudentsList = ()=>{
    const {allStudents} = useSelector((state)=>state.attendance)
    const dispatch = useDispatch()
    const handleDelete = (id)=>{
        dispatch(deleteStudent(id))
    }
    const handleEdit =(student)=>{
        dispatch(editStudent(student))
    }
    const handleStatus =(student)=>{
        dispatch(manageStudent(student))
    }
    return(
        <div className="col-6">
            <div className="border rounded-3 p-4">
                <div className="d-flex justify-content-between gap-3">
                    <h3 className="pb-2">All Students</h3>
                    <p>{allStudents.length}</p>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allStudents.map((student)=>
                                <tr key={student.id}>
                                    <td>
                                        <div>{student.name}</div>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button onClick={()=>handleEdit(student)} className="btn btn-sm btn-secondary">Edit</button>
                                            <button onClick={()=>handleDelete(student.id)} className="btn btn-sm btn-danger">Remove</button>
                                            <button onClick={()=>handleStatus({student:student, status:true})} className={`btn btn-sm btn-primary ${student.isPresent !== undefined && 'disabled'}`}>Make Present</button>
                                            <button onClick={()=>handleStatus({student:student, status:false})} className={`btn btn-sm btn-danger ${student.isPresent !== undefined && 'disabled'}`}>Make Absent</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default StudentsList