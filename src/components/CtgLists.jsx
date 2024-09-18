import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCatagories } from "../features/catagories/catagoriesSlice"
const CtgLists =()=>{
    const dispatch = useDispatch()
    const {catagories, isLoading, isError} = useSelector((state)=> state.catagories)

    useEffect(()=>{
        dispatch(fetchCatagories())
    },[dispatch])
    console.log("sdsfsdf" , catagories, isLoading, isError)
    return(
        <div className="col-6">
            <div className="border rounded-3 p-3">
                <h3>Category Lists</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Category Name</th>
                            <th className="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            !isLoading && !isError && (catagories.length > 0) ? 
                            catagories.map((catagory)=>
                                <tr key={catagory.id}>
                                    <td>{catagory.name}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-end">
                                            <button onClick={()=>handleEdit(catagory)} type="button" className="btn btn-secondary">Edit</button>
                                            <button onClick={()=>handleDelete(catagory.id)} type="button" className="btn btn-danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ): 'adgh'
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CtgLists