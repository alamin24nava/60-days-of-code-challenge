import { useDispatch, useSelector } from "react-redux"
import {useGetSelector} from "../features/catagories/catagoriesSlice"
import {getPosts} from '../features/posts/postsSlice'
import {useAuthorsSelector, dependentAuthorsByCategory} from "../features/authors/authorsSlice"
import {useTagsSelector} from "../features/tags/tagsSlice"

import { useEffect, useState } from "react"

const FilterPosts = ({setCurrentPage, _onClickCatagory, _onClickAuthor, limit, currentPage})=>{

    const {authorsByCategories} = useSelector(useAuthorsSelector)
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

        if(name == 'catagorySelect'){
            dispatch(dependentAuthorsByCategory(value))
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(getPosts({
            catagorySelect:inputValue.catagorySelect,
            authorSelect:inputValue.authorSelect,
            tagSelect:inputValue.tagSelect,
            searchSelect:inputValue.searchSelect,
            limit:limit, 
            page:currentPage
        }))
        setCurrentPage(1)
    }
    const handleReset = (e)=>{
        e.preventDefault()
        setInputValue({
            catagorySelect:'',
            authorSelect:'',
            tagSelect:'',
            searchSelect:''
        })
        dispatch(getPosts({
            inputValue:'',
            limit:limit, 
            page:currentPage
        }))
        setCurrentPage(1)
    }
    useEffect(()=>{
        setInputValue({catagorySelect:_onClickCatagory.id})
    },[_onClickCatagory])
    useEffect(()=>{
        setInputValue({authorSelect:_onClickAuthor.id})
    },[_onClickAuthor])
    return(
        <>
        <form className="mb-8">
            <div className="flex gap-4">
            {/* {console.log("sdcsd", inputValue.catagorySelect)} */}
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
                    (inputValue.catagorySelect == undefined ? authors:authorsByCategories).map((author, i)=>
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
                <button onClick={handleSubmit} className="btn btn-primary">Filter</button>
                <button onClick={handleReset} className="btn btn-error">Reset Filter</button>
            </div>
        </form>
        </>
    )
}
export default FilterPosts