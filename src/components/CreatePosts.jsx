import { useDispatch, useSelector } from "react-redux"
import { useGetSelector, getCatagories } from "../features/catagories/catagoriesSlice"
import { useTagsSelector } from "../features/tags/tagsSlice"
import { useAuthorsSelector, dependentAuthorsByCategory } from "../features/authors/authorsSlice"
import {postPosts} from '../features/posts/postsSlice'
import { getTags } from "../features/tags/tagsSlice"
import { useEffect, useState, useRef } from "react"
import useOutsideClick from '../hooks/useOutsideClick'
import moment from "moment"
const CreatePosts = ()=>{
    const {catagories} = useSelector(useGetSelector)
    const {tags} = useSelector(useTagsSelector)
    const {authorsByCategories} = useSelector(useAuthorsSelector)
    const [open, setOpen] = useState(false)
    const [selectCatagory, setSelectCatagory] = useState(null)
    const [selectAuthor, setSelectAuthor] = useState(null)
    const [postTitle, setPostTitle] = useState('')
    const [postDesc, setPostDesc] = useState('')
    const [postTags, setPostTags] = useState([])
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState([])
    const dispatch = useDispatch()
    const handleSeleteTag = ()=>{
        setOpen(!open)
    }
    const ref = useRef()
    useOutsideClick(ref, () => {
        setOpen(false)
    })
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
            postDesc:postDesc,
            postTags:[],
            dateTime: moment()
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

    const handleTagMenu = (item)=>{
        setPostTags(item)
    }
    return(
        <div className="w-full">
            <div className="border rounded-md p-6">
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
                        <input type="text" onChange={handlePostTitle} placeholder="Post Title" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="mb-3">
                        <textarea onChange={handlePostDesc} value={postDesc} className="textarea textarea-bordered" placeholder="Post Description"></textarea>
                    </div>
                    <div ref={ref}>
                        <div onClick={handleSeleteTag} className="border p-4 rounded-md">-- Select Tags --</div>  
                        <div className={open ? 'border p-4 mt-2 rounded-md block' : 'border mt-2 rounded-md h-0 hidden'}>
                            <div className="w-full mb-4">
                                <input type="text" onChange={(e)=>setQuery(e.target.value.trimStart())} placeholder="Tags" className="input input-bordered w-full" />
                            </div>
                            <div className="overflow-auto h-[8rem]">
                                {
                                    tags.map((item)=>
                                        <div value={item.name} onClick={()=>handleTagMenu(item)} key={item.id} className="cursor-pointer">{item.name}</div>                            
                                    )
                                }
                            </div>
                        </div>
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