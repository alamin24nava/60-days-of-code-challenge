import { useDispatch, useSelector } from "react-redux"
import { useGetSelector, getCatagories } from "../features/catagories/catagoriesSlice"
import { useAuthorsSelector, dependentAuthorsByCategory } from "../features/authors/authorsSlice"
import {postPosts} from '../features/posts/postsSlice'
import { getTags } from "../features/tags/tagsSlice"
import { useEffect, useState } from "react"
const CreatePosts = ()=>{
    const {catagories} = useSelector(useGetSelector)
    const {authorsByCategories} = useSelector(useAuthorsSelector)
    const [selectCatagory, setSelectCatagory] = useState(null)
    const [selectAuthor, setSelectAuthor] = useState(null)
    const [postTitle, setPostTitle] = useState('')
    const [postDesc, setPostDesc] = useState('')
    
    const dispatch = useDispatch()
    const handleSelectCatagories = (e)=>{
        setSelectCatagory(e.target.value)
        dispatch(dependentAuthorsByCategory(e.target.value))
    }
    const handleSelectAuthors = (e)=>{
        setSelectAuthor(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const newPost = {
            catagoryId: selectCatagory,
            authorId:selectAuthor,
            postTitle:postTitle,
            postDesc:postDesc
        }
        dispatch(postPosts(newPost))
    }
    useEffect(()=>{
        dispatch(getTags())
        dispatch(getCatagories())
    },[dispatch])
    const handlePostTitle = (e)=>{
        setPostTitle(e.target.value)
    }
    const handlePostDesc = (e)=>{
        setPostDesc(e.target.value)
    }
    return(
        <div className="w-full">
            <div className="border rounded-md p-6btn-x">
                <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
                    <div className="col-12">
                        <select onChange={handleSelectCatagories} className="select select-bordered w-full max-w-xs">
                            <option>-- Select Category --</option>
                            {
                                catagories &&
                                catagories.map((item)=>
                                    <option key={item.id} id={item.id} value={item.id}>{item.title}</option>                                    
                                )
                            }
                        </select>
                    </div>
                    
                    <div className="col-12">
                        <select onChange={handleSelectAuthors} className="select select-bordered w-full max-w-xs">
                            <option>-- Select Author --</option>
                            {
                                authorsByCategories &&
                                authorsByCategories.map((item)=>
                                    <option key={item.id} value={item.id}>{item.name}</option>                                    
                                )
                            }
                        </select>
                    </div>
                    <div className="col-12">
                        <input type="text" onChange={handlePostTitle} placeholder="Blog Title" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="mb-3">
                        <textarea onChange={handlePostDesc} value={postDesc} className="textarea textarea-bordered" placeholder="Bio"></textarea>
                    </div>
                    <div className="mb-3">
                    <input type="text"className="input input-bordered w-full max-w-xs" />
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Who shot first?</option>
                            
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                    </div>                                  
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreatePosts