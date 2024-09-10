import { useContext } from "react"
import { StudentContext } from "../contexs/Student"
const StudentsList = ()=>{
    const{ studentStates, dispatch} = useContext(StudentContext)
    return(
        <div className="col-6">
            <div className="border rounded-3 p-4">
                <div className="d-flex justify-content-between gap-3">
                    <h3 className="pb-2">All Students</h3>
                    <p>{studentStates.studentLists.length}</p>
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
                            studentStates.studentLists.map((student)=>
                                <tr key={student.id}>
                                    <td>
                                        <div>{student.name}</div>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button onClick={()=>dispatch({type:'handleEdit', payload:student})} className="btn btn-sm btn-secondary">Edit</button>
                                            <button onClick={()=>dispatch({type:'hangleRemove', payload:student.id})} className="btn btn-sm btn-danger">Remove</button>
                                            <button onClick={()=>dispatch({type:'handleMakeStatus', payload: {student:student, status:true}})} className={`btn btn-sm btn-primary ${student.isPresent !== undefined && 'disabled'}`}>Make Present</button>
                                            <button onClick={()=>dispatch({type:'handleMakeStatus', payload: {student:student, status:false}})} className={`btn btn-sm btn-danger ${student.isPresent !== undefined && 'disabled'}`}>Make Absent</button>
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