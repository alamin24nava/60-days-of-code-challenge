import { useDispatch, useSelector } from "react-redux"
import { getTags,postTags,deleteTags,updateTags, useGetSelector } from "../features/tags/tagsSlice"
import { useEffect, useState } from "react"
const Tags =()=>{
    const dispatch = useDispatch()
    const {tags} = useSelector(useGetSelector)
    const [tagName, setTagName] = useState('')
    const [editableTag, setEditableTag] = useState(null)
    useEffect(()=>{
        dispatch(getTags())
    },[dispatch])
    const handleTagName = (e)=>{
        setTagName(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(tagName.trim() == ''){
            return alert('Please Provide Tag Name')
        }
        const newTag = {
            name:tagName
        }
        editableTag == null? dispatch(postTags(newTag)):dispatch(updateTags({id:editableTag.id, name:tagName}))
        setTagName('')
    }
    const handleEdit = (item)=>{
        setEditableTag(item)
        setTagName(item.name)
    }

    const handleDelete = (id)=>{
        dispatch(deleteTags(id))
    }
    return(
        <div className="col-6">
            <form onSubmit={handleSubmit} className="row g-3 mb-4">
                <div className="col-auto">
                    <input onChange={handleTagName} value={tagName} type="text" className="form-control" placeholder="Create Tag"/>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary">{editableTag == null ?"Create Tag":"Update Tag" }</button>
                </div>
            </form>
            <div className="border rounded-3 p-3">
                <h4>Tag Lists</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Tag Name</th>
                            <th className="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags &&
                            tags.map((item)=>
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-end">
                                            <button onClick={()=>handleEdit(item)} type="button" className="btn btn-secondary">Edit</button>
                                            <button onClick={()=>handleDelete(item.id)} type="button" className="btn btn-danger">Delete</button>
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
export default Tags