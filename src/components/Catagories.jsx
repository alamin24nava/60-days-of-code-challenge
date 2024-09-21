import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteCatagories, getCatagories, postCatagories, useGetSelector,updateCatagories } from "../features/catagories/catagoriesSlice"
import Placeholder from "./Placeholder"
import DataNotFound from "./DataNotFound"
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
            id: Date.now(),
            title:catagoryName
        }
        return newCatagory
    }
    const handleEdit = (catagory)=>{
        setCatagoryName(catagory.title)
        setEditableCatagory(catagory)
    }
    
    const updateCatagory = ()=>{
        dispatch(updateCatagories(editableCatagory))
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(catagoryName.trim() === ''){
            return alert('Please Provider Catagory Name')
        }
        editableCatagory == null ? dispatch(postCatagories(createCatagory())):updateCatagory()
        
        setCatagoryName('')
        setEditableCatagory(null)
    }    
    const {catagories, isLoading, isError} = useSelector(useGetSelector)
    useEffect(()=>{
        dispatch(getCatagories())
    },[dispatch])

    return(
        <>
            <div className="col-6">
                <div className="border h-100 rounded-3 p-3">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-auto">
                            <input value={catagoryName} onChange={handleCatagoryName} type="text" className="form-control" id="inputPassword2" placeholder="Category Name"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">{editableCatagory == null ? 'Create Category':'Update Category'}</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-6">
                <div className="border rounded-3 p-3">
                    <h3>Category Lists</h3>
                    {
                        isLoading && !isError ? 
                        <Placeholder/>:
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
                                                    <div className="d-flex gap-2 justify-content-end">
                                                        <button type="button" onClick={()=>handleEdit(catagory)} className="btn btn-secondary">Edit</button>
                                                        <button onClick={()=>handleDelete(catagory.id)} type="button" className="btn btn-danger">Delete</button>
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
        </>
    )
}

export default Catagories