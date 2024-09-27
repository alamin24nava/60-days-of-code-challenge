import { useDispatch, useSelector } from "react-redux"
import { usePostsGetSelector, getPosts, EDITABLE_BLOG } from "../features/posts/postsSlice"
import { useGetSelector, getCatagories} from "../features/catagories/catagoriesSlice"
import { useAuthorsSelector, getAuthors} from "../features/authors/authorsSlice"
import { useTagsSelector, getTags} from "../features/tags/tagsSlice"
import { useEffect, useState } from "react"
import { FaRegClock } from "react-icons/fa6";
import moment from "moment"
import CreatePosts from "./CreatePosts"
import FilterPosts from "./FilterPosts"
const PostCard = ()=>{
    const {posts} = useSelector(usePostsGetSelector)
    const {catagories} = useSelector(useGetSelector)
    const {authors} = useSelector(useAuthorsSelector)
    const {tags} = useSelector(useTagsSelector)
    const dispatch = useDispatch()
    const [isModal, setIsModal] = useState(false)
    const closeBtn = ()=>{
        setIsModal(false)
    }

    const handleEdit = (blog)=>{
        dispatch(EDITABLE_BLOG(blog))
        setIsModal(true)
    }
    console.log(handleEdit)
    useEffect(()=>{
        dispatch(getPosts())
        dispatch(getCatagories())
        dispatch(getAuthors())
        dispatch(getTags())
    }, [dispatch])



    return(
        <>
        <FilterPosts/>
        <div className="grid grid-cols-4 gap-4">
            {
                posts?.map((item, i)=>
                {
                    const postByCatagory = catagories?.find((findId)=> parseInt(findId.id) === parseInt(item.catagoryId))
                    const postByAuthor = authors?.find((findId)=> parseInt(findId.id) === parseInt(item.authorId))
                    return(
                        <div key={i} className="card bg-base-100 shadow-xl">
                            <figure>
                                <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes" />
                            </figure>
                            <div className="card-body p-4">
                                <div className="flex justify-between items-center">
                                    <div className="badge badge-secondary">{postByCatagory?.title}</div>
                                    <div className="flex gap-2 justify-center items-center">
                                        <FaRegClock />
                                        <p className="text-xs">{moment(item.dateTime).format('MMM Do YYYY')}</p>
                                    </div>
                                </div>
                                <h2 className="card-title">{item?.postTitle}</h2>
                                <div className="badge badge-primary">Author By: {postByAuthor?.name}</div>
                                <p>{item.postDesc}</p>
                                <a className="link" href="#">Read More</a>
                                <div className="flex justify-between items-center gap-2">
                                    <button className="btn btn-neutral btn-sm" onClick={()=> handleEdit(item)} type="button">Edit</button>
                                    <div className="card-actions justify-end">

                                    {
                                        item.tags &&
                                        item?.tags?.map((tag, i)=> 
                                            {
                                                if(tags.length > 0){
                                                    const postByTag = tags?.find((findId)=> parseInt(findId.id) === parseInt(tag))
                                                    if(postByTag){
                                                    return(
                                                        <div key={i} className="badge badge-outline">{postByTag?.name}</div>
                                                    )
                                                }
                                                }
                                            }
                                           
                                        )
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
            }
        </div>
            
     
        <dialog id="my_modal_1" className="modal" open={isModal}>
            <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <CreatePosts isModal={isModal} setIsModal={setIsModal} onHandleEdit = {handleEdit}/>
            <div className="modal-action">
                <button className="btn" onClick={closeBtn}>Close</button>
       
            </div>
        </div>
        </dialog>
        </>

    )
}
export default PostCard