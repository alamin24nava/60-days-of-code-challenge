import Posts from "../components/Posts"
import Tags from "../components/Tags"
const Blogs = ()=>{
    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    return(
        <div className="row">
            <Posts/>
            <Tags/>
        </div>
    )
}
export default Blogs