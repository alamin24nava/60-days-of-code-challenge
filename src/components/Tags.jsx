import { useDispatch, useSelector } from "react-redux"
import { getTags,postTags,deleteTags,updateTags, useTagsSelector } from "../features/tags/tagsSlice"
import { useEffect, useState } from "react"
const Tags =()=>{
    const dispatch = useDispatch()
    const {tags} = useSelector(useTagsSelector)
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
        setEditableTag(null)
    }
    const handleEdit = (item)=>{
        setEditableTag(item)
        setTagName(item.name)
    }

    const handleDelete = (id)=>{
        dispatch(deleteTags(id))
    }
    return(
        <div className="border rounded-md p-3 w-full">
            <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
                <div className="col-auto">
                    <input onChange={handleTagName} value={tagName} type="text" className="input input-bordered w-full max-w-xs" placeholder="Create Tag"/>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary">{editableTag == null ?"Create Tag":"Update Tag" }</button>
                </div>
            </form>
            <div className="">
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
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={()=>handleEdit(item)} type="button" className="btn btn-neutral btn-sm">Edit</button>
                                            <button onClick={()=>handleDelete(item.id)} type="button" className="btn btn-error btn-sm">Delete</button>
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