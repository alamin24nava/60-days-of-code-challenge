import { useContext } from "react";
import { StudentContext } from "../contexs/Student";
const StudentsStatus = (props)=>{
    const{handleMakeStatus,absentStudentList,presentStudentList, dispatch} = useContext(StudentContext);
    const{title, studentStatus1} =props
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
                        { (studentStatus1 == true ? presentStudentList:absentStudentList)?.map((student)=>
                                <tr key={student.id}>
                                    <td>
                                        <div className="d-flex gap-2 align-items-center">
                                            <div>{student.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button onClick={()=>dispatch({type:'handleMakeStatus', payload:{student:student, status:undefined}})} className="btn btn-sm btn-secondary">Accidentally Added</button>
                                            <button onClick={()=>dispatch({type:'handleMakeStatus', payload:{student:student, status:undefined}})} className="btn btn-sm btn-danger">Remove</button>
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