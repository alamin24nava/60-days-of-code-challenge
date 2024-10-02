import { useParams } from "react-router-dom"
import {getSinglePost, usePostsGetSelector} from "../features/posts/postsSlice"
import {useGetSelector,getCatagories} from "../features/catagories/catagoriesSlice"
import {useAuthorsSelector,getAuthors} from "../features/authors/authorsSlice"
import {useTagsSelector,getTags} from "../features/tags/tagsSlice"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Comments from "../components/Comments"

const Blog = ()=>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const {posts} = useSelector(usePostsGetSelector)
    const {catagories} = useSelector(useGetSelector)
    const {authors} = useSelector(useAuthorsSelector)
    const {tags} = useSelector(useTagsSelector)
    useEffect(()=>{
        dispatch(getCatagories())
        dispatch(getAuthors())
        dispatch(getTags())
        dispatch(getSinglePost(id))
    }, [dispatch, id])

    let showCatagory = catagories?.find((findId)=> findId.id == posts.catagoryId)
    let showAuthor = authors?.find((findId)=> findId.id == posts.authorId)
    const filterTags = tags?.filter((tag) => posts.tags?.includes(tag.id));
    return(
        <div>
            <h3 className="text-4xl">{posts.postTitle}</h3>
            <div>

            </div>
            <div className="badge badge-secondary">Category : {showCatagory?.title}</div>
            <div className="badge badge-primary">Author by:  {showAuthor?.name}</div>
            <p>{posts.postDesc}</p>
            <div className="flex gap-2 items-center">
                <div>Tags:</div>
                <div className="flex gap-1">
                {
                    filterTags.map((item,index)=>
                        <div key={index} className="badge badge-secondary">{item.name}</div>
                    )
                }
                </div>
            </div>
            <Comments _posts = {posts} id={id}/>
        </div>
    )
}
export default Blog