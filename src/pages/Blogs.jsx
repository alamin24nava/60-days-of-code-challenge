import CreatePosts from "../components/CreatePosts"
import Tags from "../components/Tags"
const Blogs = ()=>{
    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    return(
        <div className="flex gap-6">
            <CreatePosts/>
            <Tags/>
        </div>
    )
}
export default Blogs