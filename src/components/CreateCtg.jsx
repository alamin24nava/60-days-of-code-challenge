import { useState } from "react"
import { useDispatch } from "react-redux"
import { CATAGORIES } from "../features/blog/blogSlice"
const CreateCtg = ()=>{
    const [ctgName, setCtgName] = useState('')
    // const {catagories} = useSelector((state)=>state.blog)
    const dispatch = useDispatch()
    const handleCtgName = (e)=> setCtgName(e.target.value)
    const handleSubmit =(e)=>{
        e.preventDefault()
        if(ctgName.trim() === ''){
            return alert('Please Provide Cat Name..!')
        }
        const newCtg = {
            id: Date.now(),
            name:ctgName
        }
        setCtgName('')
        dispatch(CATAGORIES(newCtg))
    }
    return(
        <div className="col-6">
            <div className="border h-100 rounded-3 p-3">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-auto">
                        <input onChange={handleCtgName} value={ctgName} type="text" className="form-control" id="inputPassword2" placeholder="Category Name"/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Create Category</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCtg