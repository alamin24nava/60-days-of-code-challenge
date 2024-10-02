import { useDispatch, useSelector } from "react-redux"
import { useGetSelector, getCatagories } from "../features/catagories/catagoriesSlice"
import { useAuthorsSelector, dependentAuthorsByCategory } from "../features/authors/authorsSlice"
import {postPosts, updatePosts, usePostsGetSelector} from '../features/posts/postsSlice'
import {useTagsSelector} from '../features/tags/tagsSlice'
import { getTags } from "../features/tags/tagsSlice"
import { useEffect, useState } from "react"
import moment from "moment"
import toast from "react-hot-toast"
import SearchableDropdown from "./SearchableDropdown"
const CreatePosts = (props)=>{
    const {catagories} = useSelector(useGetSelector)
    const {editablePost} = useSelector(usePostsGetSelector)
    const {tags} = useSelector(useTagsSelector)
    const {authorsByCategories} = useSelector(useAuthorsSelector)
    const [selectedDropDowns, setSelectedDropDowns] = useState([])
    let selectedTagId = selectedDropDowns.map( (item) => item.id);
    const [selectCatagory, setSelectCatagory] = useState('')
    const [selectAuthor, setSelectAuthor] = useState('')
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
    const handlePostTitle = (e)=>{
        setPostTitle(e.target.value)
    }
    const handlePostDesc = (e)=>{
        setPostDesc(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(selectCatagory == '' || selectAuthor == '' || postTitle === '' || postDesc == ''){
            return toast.error('Post Added Failed!')
        }
        const newPost = {
            catagoryId: parseInt(selectCatagory),
            authorId:parseInt(selectAuthor),
            postTitle:postTitle,
            postDesc:postDesc,
            dateTime: moment(),
            tags:selectedTagId,
        }

        if(!editablePost){
            dispatch(postPosts(newPost))
            toast.success('Post Added Successfully!')
        }else{
            const dispatchUpdatePosts = {
                selectCatagory,
                selectAuthor,
                postTitle,
                postDesc,
                selectedTagId
            }
            dispatch(updatePosts({editablePost,dispatchUpdatePosts }))
            toast.success('Post Updated!')
            props.setIsModal(false)
        }
        
        setSelectCatagory('')
        setSelectAuthor('')
        setPostDesc('')
        setPostTitle('')
        selectedTagId = ''
    }
    const isEditablePost = ()=>{
        if(editablePost){
            setSelectCatagory(editablePost.catagoryId)
            dispatch(dependentAuthorsByCategory(editablePost.catagoryId))
            setSelectAuthor(authorsByCategories.name)
            setPostTitle(editablePost.postTitle)
            setPostDesc(editablePost.postDesc)
            setSelectedDropDowns(editablePost.tags)
        }
    }
    useEffect(()=>{
        isEditablePost()
    },[editablePost])

    useEffect(()=>{
        dispatch(getTags())
        dispatch(getCatagories())
    },[dispatch])
    console.log(selectedTagId)
    return(
        <div className="w-full">
            <div className="border rounded-md p-6">
                <form className="flex gap-4 flex-col">
                    <div className="col-12">
                        <select onChange={handleSelectCatagories} value={selectCatagory} className="select select-bordered w-full max-w-xs">
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
                        <select onChange={handleSelectAuthors} value={selectAuthor} className="select select-bordered w-full max-w-xs">
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
                        <input type="text" onChange={handlePostTitle} value={postTitle} placeholder="Post Title" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="mb-3">
                        <textarea onChange={handlePostDesc} value={postDesc} className="textarea textarea-bordered" placeholder="Post Description"></textarea>
                    </div>
                    <SearchableDropdown selectedDropDowns={selectedDropDowns} setSelectedDropDowns={setSelectedDropDowns}/>                              
                    <div className="col-12">
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">{!editablePost ? "Create Post":"Updated Post"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreatePosts