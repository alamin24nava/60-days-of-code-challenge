import { useDispatch, useSelector } from "react-redux"
import {useCommentsSelector, getComments, postComments} from "../features/comments/commentsSlice"
import {useLikesSelector, getLikes} from "../features/likes/likesSlice"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
const Comments =({_posts, id})=>{
    const [comment, setCommnet] = useState('')
    const dispatch = useDispatch()
    const {comments} = useSelector(useCommentsSelector)
    const {likes} = useSelector(useLikesSelector)
    useEffect(()=>{
        dispatch(getComments())
        dispatch(getLikes())
    },[dispatch])
    const filterComments = comments?.filter((comment) => comment.blogId == _posts.id);
    const filterLikes = likes?.filter((like) => like.blogId == _posts.id);


    const handleComment = (e)=>{
        setCommnet(e.target.value)
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(comment == ''){
            return toast.error('Please Provide Something...')
        }
        dispatch(postComments({
            blogId: id,
            commentDesc : comment
        }))
        toast.success('Comment Added Successfull!')
        setCommnet('')
    }
    return(
       <div>
        <div className="text-4xl">Comment <span>({filterComments.length})</span></div>
        <div>{filterLikes.count}</div>
            <form onSubmit={handleSubmit} className="mt-6">
                <textarea onChange={handleComment} value={comment} className="textarea textarea-bordered w-full" placeholder="Bio"></textarea>
                <button className="btn">Comment</button>
            </form>
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