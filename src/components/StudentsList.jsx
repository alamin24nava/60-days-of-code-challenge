import { useContext } from "react"
import { StudentContext } from "../contexs/Student"
const StudentsList = ()=>{
    const{studentLists, handleEdit, hangleRemove, handleMakeStatus} = useContext(StudentContext)
    return(
        <div className="col-6">
            <div className="border rounded-3 p-4">
                <div className="d-flex justify-content-between gap-3">
                    <h3 className="pb-2">All Students</h3>
                    <p>{studentLists.length}</p>
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
                            studentLists.map((student)=>
                                <tr key={student.id}>
                                    <td>
                                        <div>{student.name}</div>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button onClick={()=>handleEdit(student)} className="btn btn-sm btn-secondary">Edit</button>
                                            <button onClick={()=>hangleRemove(student.id)} className="btn btn-sm btn-danger">Remove</button>
                                            <button onClick={()=>handleMakeStatus(student, "present")} className={`btn btn-sm btn-primary ${student.ispresent !== undefined && 'disabled'}`}>Make Present</button>
                                            <button onClick={()=>handleMakeStatus(student, "absent")} className={`btn btn-sm btn-danger ${student.ispresent !== undefined && 'disabled'}`}>Make Absent</button>
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