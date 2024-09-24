import { useDispatch, useSelector } from "react-redux"
import { useGetSelector } from "../features/catagories/catagoriesSlice"
import { useAuthorsSelector, getAuthors, postAuthors } from "../features/authors/authorsSlice"
import { useEffect, useState } from "react"
const Authors = ()=>{
    const dispatch = useDispatch()
    const [authorName, setAuthorName] = useState('')
    const [selectCatagory, setSelectCatagory] = useState()
    const {catagories} = useSelector(useGetSelector)
 

    const {authors} = useSelector(useAuthorsSelector)
    const handleAuthorName = (e)=>{
        setAuthorName(e.target.value);
    }
    // const createAuthor =()=>{
    //     const newAuthor = {
    //         id: Date.now(),
    //         name: authorName,
    //         catagoryId: selectCatagory,
    //     }
    //     return newAuthor
    // }
    const handleSubmit = (e)=>{
        e.preventDefault()
        authorName.trim() === '' ? alert('Please Provide Author Name'):''
        if(selectCatagory == ''){
            return
        }
        const newAuthor = {
            name: authorName,
            catagoryId: Number(selectCatagory),
        }
        dispatch(postAuthors(newAuthor))   
        setAuthorName('')
        setSelectCatagory('')
    }
    const handleSelect = (e)=>{
        setSelectCatagory(e.target.value)
        console.log(e.target.value)
    }
    useEffect(()=>{
        dispatch(getAuthors())
    },[dispatch])
    return(
        <div className="flex gap-4">
            <div className="w-full border h-100 rounded-md p-3">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-auto">
                        <select onChange={handleSelect} value={selectCatagory} className="select select-bordered w-full max-w-xs">
                            <option disabled selected>-- Select Category --</option>
                            {
                                catagories.map((item)=>
                                    <option key={item.id} value={item.id}>{item.title}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col-auto">
                        <input type="text" value={authorName} onChange={handleAuthorName} placeholder="Authour Name" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Create Author</button>
                    </div>
                </form>
            </div>
            <div className="w-full border h-100 rounded-md p-3">
                <h4>Author Lists</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Category ID</th>
                            <th scope="col">Category Name</th>
                            <th className="text-end">Author Name</th>
                        </tr>
                    </thead>
                    <tbody>

                        {authors &&
                            authors.map((item)=>{
                                
                                const authorsByCatagory = catagories?.find((findId)=> findId.id == item.catagoryId)
                                return(
                                    <tr key={item.id}>
                                        
                                        <td>{authorsByCatagory && authorsByCatagory.id}</td>
                                        <td>{authorsByCatagory && authorsByCatagory.title}</td>
                                        <td>
                                            <div className="flex gap-2 justify-end">
                                                <span>{item.name}</span>
                                            </div>
                                        </td>
                                    </tr> 
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Authors