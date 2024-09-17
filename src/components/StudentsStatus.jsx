import { useDispatch, useSelector } from "react-redux"
import { manageStudent } from "../features/student_attendances/studentAttendancesSlice"
const StudentsStatus = (props)=>{
    const{title, studentStatus} =props
    const dispatch = useDispatch()
    const {allStudents} = useSelector((state)=>state.attendance)
    const presentStudents = allStudents.filter((present)=>present.isPresent == true)
    const absentStudents = allStudents.filter((present)=>present.isPresent == false)
    const handleStatus =(student)=>{
        dispatch(manageStudent(student))
    }
    return(
        <div className="col-3">
            <div className="border rounded-3 p-4">
                <div className="d-flex justify-content-between gap-3">
                    <h3 className="pb-2">{title}</h3>
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
                            (studentStatus==true ? presentStudents:absentStudents)?.map((student)=>
                                <tr key={student.id}>
                                    <td>
                                        <div className="d-flex gap-2 align-items-center">
                                            <div>{student.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button onClick={()=>handleStatus({student:student, status:undefined})} className="btn btn-sm btn-secondary">Accidentally Added</button>
                                            <button onClick={()=>handleStatus({student:student, status:'remove'})} className="btn btn-sm btn-danger">Remove</button>
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
export default StudentsStatus