import { useDispatch, useSelector } from "react-redux"
import {useGetSelector} from "../features/catagories/catagoriesSlice"
import {getPosts} from '../features/posts/postsSlice'
import {useAuthorsSelector} from "../features/authors/authorsSlice"
import {useTagsSelector} from "../features/tags/tagsSlice"
import { useState } from "react"

const FilterPosts = ()=>{
    const {catagories} = useSelector(useGetSelector)
    const {authors} = useSelector(useAuthorsSelector)
    const {tags} = useSelector(useTagsSelector)
    const [inputValue, setInputValue] = useState({
        catagorySelect:'',
        authorSelect:'',
        tagSelect:'',
        searchSelect:''
    })
    const dispatch = useDispatch()
    const handleChange = (e)=>{
        const {name, value} = e.target
        setInputValue((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(getPosts(inputValue))
    }
    return(
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
                <select onChange={handleChange} name='catagorySelect' value={inputValue.catagorySelect} className="select select-bordered w-full max-w-xs">
                    <option value="">-- Select Category --</option>
                    {
                    catagories &&
                    catagories?.map((catagory, i)=>
                        <option id={catagory?.id} value={catagory?.id} key={i}>{catagory?.title}</option>               
                    ) 
                    }
                </select>

                <select onChange={handleChange} name='authorSelect' value={inputValue.authorSelect} className="select select-bordered w-full max-w-xs">
                    <option value="">-- Select Author --</option>
                    {
                    authors &&
                    authors?.map((author, i)=>
                        <option id={author?.id} value={author?.id} key={i}>{author?.name}</option>               
                    ) 
                    }
                </select>
                <select onChange={handleChange} name='tagSelect' value={inputValue.tagSelect} className="select select-bordered w-full max-w-xs">
                    <option value="">-- Select Tag --</option>
                    {
                    tags &&
                    tags?.map((tag, i)=>
                        <option id={tag?.id} value={tag?.id} key={i}>{tag?.name}</option>               
                    ) 
                    }
                </select>

                <input type="text" name='searchSelect' value={inputValue.searchSelect} onChange={handleChange} placeholder="Search Post" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-primary">Filter</button>
            </div>
        </form>
    )
}
export default FilterPosts