import Authors from "../components/Authors"
import Catagories from "../components/Catagories"
// import GlobalLoading from "../components/GlobalLoading"
import Test from "../components/Test"
const Home =()=>{
    return(
        <div className="flex column flex-col gap-8">
            <Catagories/>
            <Authors/>
            <Test/>
        </div>
    )
}
export default Home