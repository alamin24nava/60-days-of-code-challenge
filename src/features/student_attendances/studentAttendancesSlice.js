import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    studentName:'',
    allStudents: [],
    editableStudent: null,
    msg:'',
}
const studentAttendancesSlice = createSlice({
    name: 'student_attendances',
    initialState,
    reducers: {
        changeName:(state, action)=>{
            state.studentName = action.payload
        },
        studentCreate:(state, action)=>{
            state.allStudents.push(action.payload)
            state.studentName = ''
        },
        editStudent:(state, action)=>{
            state.editableStudent = action.payload
            state.studentName = action.payload.name
        },
        updatedStudent:(state, action)=>{
            state.allStudents = state.allStudents.map((item)=>{
                if(item.id == state.editableStudent.id){
                    return {...item, name:action.payload}
                }
                return item
            })
            state.studentName = ''
            state.editableStudent = null
        },
        deleteStudent:(state, action)=>{
            state.allStudents = state.allStudents.filter((item)=> item.id !== action.payload)
        },
        presentStudents:(state)=>{
            state.allStudents = state.allStudents.filter(present => present.isPresent === true)
        },
        manageStudent:(state, action)=>{
            state.allStudents = state.allStudents.map((item)=>{
                if(item.id === action.payload.student.id){
                    if(action.payload.status == true){
                        return {...item, isPresent:true}
                    } else if(action.payload.status == false){
                        return {...item, isPresent:false}
                    } else if(action.payload.status == 'remove'){
                        return {...item, isPresent:undefined}
                    } else if(action.payload.status == undefined){
                        return {...item, isPresent:!item.isPresent}
                    }
                }
                return item
            })
        }
    }
})
export const { changeName, studentCreate,deleteStudent,editStudent,updatedStudent,presentStudents,manageStudent } = studentAttendancesSlice.actions
export default studentAttendancesSlice.reducer