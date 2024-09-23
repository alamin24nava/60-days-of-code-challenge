import './App.css'
import CreateCtg from './components/CreateCtg';
import CtgLists from './components/CtgLists';
import CreateAthour from './components/CreateAuthor';
import AuthorLists from './components/AuthorLists';
function App() {
    return (
        <>  
        <h2 className='text-xl font-semibold text-red-500'>Hello world</h2>
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
