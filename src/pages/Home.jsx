import Authors from "../components/Authors"
import Catagories from "../components/Catagories"
const Home =()=>{
    return(
        <>
            <div className="row g-4">
                <Catagories/>
                <Authors/>
            </div>
        </>
    )
}
export default Home