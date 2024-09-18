import CreateCtg from "../components/CreateCtg"
import CtgLists from "../components/CtgLists"
// import CreateAthour from "../components/CreateAthour"
// import AuthorLists from "../components/AuthorLists"
const Home =()=>{
    return(
        <>
            <div className="row g-4">
                
                <CreateCtg/>
                <CtgLists/>
                {/* <CreateAthour/> */}
                {/* <AuthorLists/> */}
            </div>
        </>
    )
}
export default Home