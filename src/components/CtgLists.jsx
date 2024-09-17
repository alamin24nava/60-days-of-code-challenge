import { useDispatch, useSelector } from "react-redux"
import { HANDLE_DELETE } from "../features/blog/blogSlice"
const CtgLists =()=>{
    const {catagories} = useSelector((state)=> state.blog)
    const dispatch = useDispatch()
    const handleDelete =(ctg)=>{
        dispatch(HANDLE_DELETE(ctg))
    }
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
                        {
                            catagories.map((catagory)=>
                                <tr key={catagory.id}>
                                    <td>{catagory.name}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-end">
                                            <button type="button" className="btn btn-secondary">Edit</button>
                                            <button onClick={()=>handleDelete(catagory.id)} type="button" className="btn btn-danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CtgLists