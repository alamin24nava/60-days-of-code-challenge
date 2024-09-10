const StudentForm = (props)=>{
    const {handleSubmit, handleStudentName, studentName,msg, editMode} = props
    return(
        <form onSubmit={handleSubmit} className="w-25 mx-auto mb-5">
            <input onChange={handleStudentName} value={studentName} type="text" className="form-control mb-2" placeholder="Enter Name"/>
            <p className="text-danger">{msg}</p>
            <button className="btn btn-primary w-100" type="submit">{editMode ? 'Update Student':'Add Student'}</button>
        </form>
    )
}
export default StudentForm