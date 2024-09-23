import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteCatagories, getCatagories, postCatagories, useGetSelector,updateCatagories } from "../features/catagories/catagoriesSlice"
import Placeholder from "./Placeholder"
import GlobalLoading from "./GlobalLoading"
import DataNotFound from "./DataNotFound"
import toast from "react-hot-toast"
import Toast from "./Toast"
const Catagories =()=>{
    const dispatch = useDispatch()
    const [catagoryName, setCatagoryName] = useState('')
    const [editableCatagory, setEditableCatagory] = useState(null)
    const handleCatagoryName = (e)=>{
        setCatagoryName(e.target.value)
    }
    const handleDelete =(catagoryId)=>{
        dispatch(deleteCatagories(catagoryId))
    }
    const createCatagory = ()=>{
        const newCatagory = {
            title:catagoryName
        }
        return newCatagory
    }
    const handleEdit = (catagory)=>{
        setCatagoryName(catagory.title)
        setEditableCatagory(catagory)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(catagoryName.trim() === ''){
            return toast.error("Please Enter Your Category Name")
        }
        editableCatagory == null ? dispatch(postCatagories(createCatagory())):dispatch(updateCatagories({id:editableCatagory.id, title:catagoryName}))
        
        setCatagoryName('')
        setEditableCatagory(null)
    }    
    const {catagories, isLoading, isError} = useSelector(useGetSelector)
    useEffect(()=>{
        dispatch(getCatagories())
    },[dispatch])

    return(
        <div className="flex gap-4">
            <div className="w-full border h-100 rounded-md p-3">
                <form onSubmit={handleSubmit} className="columns-2">
                    <div className="col-auto">
                        <input type="text" value={catagoryName} onChange={handleCatagoryName} placeholder="Category Name" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">{editableCatagory == null ? 'Create Category':'Update Category'}</button>
                    </div>
                </form>
            </div>
            <div className="w-full border rounded-md p-3">
                <h3 className="font-semibold">Category Lists</h3>
                {
                    isLoading && !isError ? 
                    <GlobalLoading/>:
                    <>
                    {
                        !isLoading && !isError && (catagories.length > 0) ? 
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
                                            <td>{catagory.title}</td>
                                            <td>
                                                <div className="flex gap-2 justify-end">
                                                    <button type="button" onClick={()=>handleEdit(catagory)} className="btn btn-neutral">Edit</button>
                                                    <button onClick={()=>handleDelete(catagory.id)} type="button" className="btn btn-error">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                        </table> : <DataNotFound/>
                    }
                        
                    </>
                }
            </div>
        </div>
    )
}

export default Catagories