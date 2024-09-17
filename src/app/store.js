import { configureStore } from "@reduxjs/toolkit";
import attendancesReducer from "../features/student_attendances/studentAttendancesSlice";

export const store = configureStore({
    reducer: {
        attendance: attendancesReducer
    },
})