const StudentsStatus = (props)=>{
    const{title,studentStatus,handleToggleList,handleMakeStatus}=props;
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
                            studentStatus?.map((student)=>
                                <tr key={student.id}>
                                    <td>
                                        <div className="d-flex gap-2 align-items-center">
                                            <div>{student.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            {/* <button onClick={()=>handleToggleList(student)} className="btn btn-sm btn-secondary">Accidentally Added</button> */}
                                            <button onClick={()=>handleMakeStatus(student, 'undefined')} className="btn btn-sm btn-secondary">Accidentally Added</button>
                                            <button onClick={()=>handleMakeStatus(student, 'remove')} className="btn btn-sm btn-danger">Remove</button>
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