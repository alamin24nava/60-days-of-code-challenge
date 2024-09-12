import 'bootstrap/dist/css/bootstrap.min.css';
import StudentForm from "./components/StudentForm";
import StudentsList from "./components/StudentsList";
import StudentsStatus from "./components/StudentsStatus";
function App() {
    return (
    <>
        <StudentForm/>
        <div className="row">
            <StudentsList/>
            <StudentsStatus studentStatus1={true} title="Present Students"/>
            <StudentsStatus studentStatus={false} title="Absent Students"/> 
        </div>
    </>
    )
}

export default App