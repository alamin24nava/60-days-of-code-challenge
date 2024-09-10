import {useContext, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentForm from "./components/StudentForm";
import StudentsList from "./components/StudentsList";
import StudentsStatus from "./components/StudentsStatus";
import { StudentContext } from "./contexs/Student";
function App() {
    const {presentStudentList, absentStudentList} = useContext(StudentContext)
    return (
    <>
        <StudentForm/>
        <div className="row">
            <StudentsList/>
            <StudentsStatus studentStatus={presentStudentList} title="Present Students"/>
            <StudentsStatus studentStatus={absentStudentList} title="Absent Students"/> 
        </div>
    </>
    )
}

export default App
