import { createContext, useState } from "react";

export const StudentContext = createContext()

const StudentProvider = (props)=>{
    const {children} = props
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
                if(status === 'present'){
                    return {...item, ispresent: true }
                } else if(status === 'absent'){
                    return {...item, ispresent: false }
                } else if(status === 'remove'){
                    return {...item, ispresent: undefined}
                } else if(status === 'undefined'){
                    return {...item, ispresent: !item.ispresent}
                }
            } 
            return item
        })
        setStudentLists(updatedStudent)
    }
    const contextValue = {
        studentName,
        setStudentName,
        studentLists,
        setStudentLists,
        editMode,
        setEditMode,
        editableStudent,
        setEditableStudent,
        msg,
        setMsg,
        handleStudentName,
        handleSubmit,
        hangleRemove,
        handleEdit,
        presentStudentList,
        absentStudentList,
        handleMakeStatus,
        studentLists
    }
    return(
        <>
            <StudentContext.Provider value={contextValue}>
                {children}
            </StudentContext.Provider>
        </>

    )
}
export default StudentProvider