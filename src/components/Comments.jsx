import { useDispatch, useSelector } from "react-redux"
import {useCommentsSelector, getComments, postComments} from "../features/comments/commentsSlice"
import { useEffect, useState } from "react"
const Comments =({_posts})=>{
    const [comment, setCommnet] = useState('')
    const dispatch = useDispatch()
    const {comments} = useSelector(useCommentsSelector)
    useEffect(()=>{
        dispatch(getComments())
        dispatch(postComments('hello'))
    },[dispatch])
    const filterComments = comments?.filter((comment) => comment.blogId == _posts.id);

    const handleComment = (e)=>{
        setCommnet(e.target.value)
    }

    console.log(comment)
    return(
       <div>
            <div className="mt-6">
                <textarea onChange={handleComment} className="textarea textarea-bordered w-full" placeholder="Bio"></textarea>
                <button className="btn">Comment</button>
            </div>
            <div className="flex flex-col gap-3">
                {
                    filterComments.map((item, index)=>
                        <div className="border p-4" key={index}>{item.commentDesc}</div>
                    )
                }
            </div>
       </div>
    )
}

export default Comments