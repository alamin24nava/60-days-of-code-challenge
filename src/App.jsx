import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import CreateCtg from './components/CreateCtg';
import CtgLists from './components/CtgLists';
import CreateAthour from './components/CreateAuthor';
import AuthorLists from './components/AuthorLists';
function App() {
    return (
        <>  
            <div className="row g-4">
                <CreateCtg/>
                <CtgLists/>
                <CreateAthour/>
                <AuthorLists/>
            </div>
        </>
    )
}

export default App
