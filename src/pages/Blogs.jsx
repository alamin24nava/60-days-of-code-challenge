import CreatePosts from "../components/CreatePosts"
import Tags from "../components/Tags"
const Blogs = ()=>{

    return(
        <div className="flex gap-6">
            <CreatePosts/>
            <Tags/>
        </div>
    )
}
export default Blogs