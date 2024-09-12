import { createContext, useReducer, useState } from "react";

export const StudentContext = createContext()
const initState = {
    studentName:'',
    studentLists: [],
    editMode:false,
    editableStudent: null,
    msg:'',
}
const studentReducer = (state = initState, action)=>{
    switch(action.type){
        case "studentName":{
            return{
                ...state,
                studentName: action.payload,
            }
        }
        case "handleCreate":{
            const newStudent = {
                id: Date.now() + "",
                name: state.studentName,
                isPresent: undefined,
            }
            return{
                ...state,
                studentLists: [...state.studentLists, newStudent],
                studentName:"",
            }
        }
        case "handleEdit":{
            return{
                ...state,
                editMode:true,
                editableStudent: action.payload,
                studentName:action.payload.name
            }
        }
        case "handleUpdate":{
            return{
                ...state,
                studentLists : state.studentLists.map((item)=>{
                    if(item.id === state.editableStudent.id){
                        return {...item, name: state.studentName}
                    }
                    return item
                }),
                editMode:false,
                editableStudent:null,
                studentName:''

            }
        }
        case "hangleRemove":{
            return{
                ...state,
                studentLists: state.studentLists.filter((item)=> item.id !== action.payload)
            }
        }
        case "handleMakeStatus":{
            return {
                ...state,
                studentLists: state.studentLists.map((item)=> {
                    if(item.id === action.payload.student.id){
                        if(action.payload.status === true){
                            return {...item, isPresent: true }
                        } else if(action.payload.status === false){
                            return {...item, isPresent: false }
                        } else if(action.payload.status === 'remove'){
                            return {...item, isPresent: undefined}
                        } else if(action.payload.status === undefined){
                            return {...item, isPresent: !item.isPresent}
                        }
                    }
                    return item
                })
            }
        }
        case "msg":{
            return {
                ...state,
                msg : action.payload
            }
        }
        default:{
            return state;
        }
    }
}
const StudentProvider = (props)=>{
    const {children} = props

    const [studentStates, dispatch] = useReducer(studentReducer, initState)
    const presentStudentList = studentStates.studentLists.filter(present => present.isPresent === true)
    const absentStudentList = studentStates.studentLists.filter(present => present.isPresent === false)
    const handleStudentName = (e)=>{
        dispatch({type:'studentName', payload:e.target.value})
    }
    // handleSubmit
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(studentStates.studentName.trim() === ''){
            return dispatch({type:"msg", payload:'Please Provide Student Name'})
        }else{
            dispatch({type:"msg", payload:''})
        }
        studentStates.editMode ? dispatch({type:"handleUpdate"}) : dispatch({type:"handleCreate"})
    }


    const contextValue = {
        studentStates,
        dispatch,
        handleStudentName,
        handleSubmit,
        presentStudentList,
        absentStudentList
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