import Authors from "../components/Authors"
import Catagories from "../components/Catagories"
import GlobalLoading from "../components/GlobalLoading"
const Home =()=>{
    return(
        <div className="flex column flex-col gap-8">
            <Catagories/>
            <Authors/>
        </div>
    )
}
export default Home