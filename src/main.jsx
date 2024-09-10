import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import StudentProvider from './contexs/Student'

createRoot(document.getElementById('root')).render(
    <StudentProvider>
        <App/>
    </StudentProvider>

)
