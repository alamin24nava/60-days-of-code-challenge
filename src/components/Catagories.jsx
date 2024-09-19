import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchCatagories } from "../features/catagories/catagoriesSlice"
const Catagories =()=>{
    const dispatch = useDispatch()
    const [catagoryName, setCatagoryName] = useState('')
    const handleChange = (e)=>{
        setCatagoryName(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(catagoryName.trim() === ''){
            return alert('Please Provider Catagory Name')
        }
        dispatch()
    }
    console.log(catagoryName)

    const {catagories, isLoading, isError} = useSelector((state)=> state.catagories)
    useEffect(()=>{
        dispatch(fetchCatagories())
    },[dispatch])

    return(
        <>
            <div className="col-6">
                <div className="border h-100 rounded-3 p-3">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-auto">
                            <input value={catagoryName} onChange={handleChange} type="text" className="form-control" id="inputPassword2" placeholder="Category Name"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Create Category</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-6">
                <div className="border rounded-3 p-3">
                    <h3>Category Lists</h3>
                    {
                        isLoading && !isError ? <div>
                            <p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                            </p>

                            <p className="placeholder-wave">
                            <span className="placeholder col-12"></span>
                            </p>
                        </div>:
                    
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Category Name</th>
                                    <th className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !isLoading && !isError && (catagories.length > 0) ? 
                                    catagories.map((catagory)=>
                                        <tr key={catagory.id}>
                                            <td>{catagory.title}</td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-end">
                                                    <button onClick={()=>handleEdit(catagory)} type="button" className="btn btn-secondary">Edit</button>
                                                    <button onClick={()=>handleDelete(catagory.id)} type="button" className="btn btn-danger">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ): <div className="text-danger">Data Not Found !</div>
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Catagories