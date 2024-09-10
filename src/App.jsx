import {useRef, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentForm from "./components/StudentForm";
import StudentsList from "./components/StudentsList";
import StudentsStatus from "./components/StudentsStatus";
function App() {
    const [studentName, setStudentName] = useState("");
    const [studentLists, setStudentLists] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editableStudent, setEditableStudent] = useState(null);
    const [msg, setMsg] = useState('')

    // handleStudentName
    const handleStudentName = (e)=>{
        setStudentName(e.target.value)
    }
    // handleSubmit
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(studentName.trim() === ''){
            return setMsg('Please Provide Student Name')
        }else{
            setMsg('')
        }
        editMode ? handleUpdate() : handleCreate()
    }
    // handleCreate
    const handleCreate = ()=>{
        const addStudent = {
            id: Date.now() + "",
            name: studentName,
            ispresent: undefined,
        }
        setStudentLists([addStudent, ...studentLists]);
        setStudentName("")
    }
    // hangleRemove
    const hangleRemove= (studentId) =>{
        const updateStudent = studentLists.filter((item)=> item.id !== studentId)
        setStudentLists(updateStudent)
    }
    // handleEdit
    const handleEdit = (student)=>{
        setEditMode(true)
        setStudentName(student.name)
        setEditableStudent(student)
    }
    // handleUpdate
    const handleUpdate = ()=>{
        const updatedStudent = studentLists.map((item)=>{
            if(item.id == editableStudent.id){
                return {...item, name:studentName}
            }
            return item
        })
        setStudentLists(updatedStudent)
        setStudentName('')
        setEditMode(false)
        setEditableStudent(null)
    }

    const presentStudentList = studentLists.filter(present => present.ispresent === true)
    const absentStudentList = studentLists.filter(present => present.ispresent === false)
    // handleMakeStatus
    const handleMakeStatus = (student, status)=>{
        const updatedStudent = studentLists.map((item)=>{
            if(item.id === student.id){
                if(status === true){
                    return {...item, ispresent: true }
                } else if(status === false){
                    return {...item, ispresent: false }
                } else if(status === 'remove'){
                    return {...item, ispresent: undefined}
                } else if(status === 'accidentally'){
                    return {...item, ispresent: !item.ispresent}
                }
            } 
            return item
        })
        setStudentLists(updatedStudent)
    }
    return (
    <>
        <StudentForm 
        handleSubmit={handleSubmit}
        handleStudentName={handleStudentName}
        studentName={studentName}
        msg={msg}
        editMode={editMode}
        />
        <div className="row">
            <StudentsList
            studentLists={studentLists}
            handleEdit={handleEdit}
            hangleRemove={hangleRemove}
            handleMakeStatus={handleMakeStatus}
            />
            <StudentsStatus 
            handleMakeStatus={handleMakeStatus} 
            title='Present Student' 
            studentStatus={presentStudentList}
            />
            <StudentsStatus 
            handleMakeStatus={handleMakeStatus} 
            title="Absent Student" 
            studentStatus={absentStudentList}
            />
        </div>
    </>
    )
}

export default App
