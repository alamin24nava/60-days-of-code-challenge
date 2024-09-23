import { useDispatch, useSelector } from "react-redux"
import { useGetSelector, getCatagories } from "../features/catagories/catagoriesSlice"
import { useAuthorsSelector, dependentAuthorsByCategory } from "../features/authors/authorsSlice"
import { getTags } from "../features/tags/tagsSlice"
import { useEffect, useState } from "react"
const CreatePosts = ()=>{
    const {catagories} = useSelector(useGetSelector)
    const {authorsByCategories} = useSelector(useAuthorsSelector)
    const [selectCatagory, setSelectCatagory] = useState(null)
    const [selectAuthor, setSelectAuthor] = useState(null)
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
    }
    useEffect(()=>{
        dispatch(getTags())
        dispatch(getCatagories())
    },[dispatch])
    console.log("selectCatagory",selectCatagory)
    console.log("selectAuthor", selectAuthor)
    return(
        <div className="col-6">
            <div className="border rounded-3 p-3">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12">
                        <select onChange={handleSelectCatagories} className="form-select">
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
                        <h3 className="text-error">asdadsas aslkdmnajdb</h3>
                        <select onChange={handleSelectAuthors} className="form-select">
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
                        <input type="text" className="form-control" id="inputPassword2" placeholder="Blog Title"/>
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Blog Description"></textarea>
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