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
            id: Date.now(),
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
        <>
        <div className="col-6">
             <div className="border rounded-3 p-3">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="max-w-sm p-6 bg-white rounded shadow-md">
                        <div className="col-auto">
                            <select onChange={handleSelect} value={selectCatagory} className="form-select">
                            <option>-Selete-</option>
                                {
                                    catagories.map((item)=>
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-auto">
                        <input onChange={handleAuthorName} value={authorName} type="text" className="form-control" id="inputPassword2" placeholder="Authour Name"/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Create Author</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="col-6">
            <div className="border rounded-3 p-3">
                <h4>Author Lists</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="text-6xl">Category ID</th>
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
                                            <div className="d-flex gap-2 justify-content-end">
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
        </>
    )
}
export default Authors