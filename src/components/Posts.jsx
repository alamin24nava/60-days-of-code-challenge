import { useDispatch, useSelector } from "react-redux"
import { useGetSelector } from "../features/catagories/catagoriesSlice"
import { useAuthorsSelector, dependentAuthorsByCategory } from "../features/authors/authorsSlice"
import { useState } from "react"
const Posts = ()=>{
    const {catagories} = useSelector(useGetSelector)
    const {authors, authorsByCategories} = useSelector(useAuthorsSelector)
    const [selectCatagoryName, setSelectCatagoryName] = useState(null)
    const [selectAuthorName, setSelectAuthorName] = useState(null)
    const dispatch = useDispatch()
    const handleSelectCatagories = (e)=>{
        setSelectCatagoryName(e.target.value)
        dispatch(dependentAuthorsByCategory(1))
    }
    const handleSelectAuthors = (e)=>{
        setSelectAuthorName(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        

    }
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
                                    <option key={item.id} id={item.id} value={item.title}>{item.title}</option>                                    
                                )
                            }
                        </select>
                    </div>
                    
                    <div className="col-12">
                        <select onChange={handleSelectAuthors} className="form-select">
                            <option>-- Select Author --</option>
                            {
                                authorsByCategories &&
                                authorsByCategories.map((item)=>
                                    <option key={item.id} value={item.name}>{item.name}</option>                                    
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
export default Posts