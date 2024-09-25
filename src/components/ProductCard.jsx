import { useDispatch, useSelector } from "react-redux"
import { usePostsGetSelector, getPosts } from "../features/posts/postsSlice"
import { useGetSelector, getCatagories} from "../features/catagories/catagoriesSlice"
import { useAuthorsSelector, getAuthors} from "../features/authors/authorsSlice"
import { useEffect } from "react"

const ProductCard = ()=>{
    const {posts} = useSelector(usePostsGetSelector)
    const {catagories} = useSelector(useGetSelector)
    const {authors} = useSelector(useAuthorsSelector)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPosts())
        dispatch(getCatagories())
        dispatch(getAuthors())
    }, [dispatch])
    console.log(authors, "asdasd")
    // console.log("catagories===", catagories)
    return(
        <div className="grid grid-cols-4 gap-4">
            {
                posts?.map((item)=>
                {
                    const postByCatagory = catagories?.find((findId)=> parseInt(findId.id) === parseInt(item.catagoryId))
                    const postByAuthor = authors?.find((findId)=> parseInt(findId.id) === parseInt(item.authorId))
                    return(
                        <div key={item.id} className="card bg-base-100 shadow-xl">
                        <figure>
                            <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes" />
                        </figure>
                        <div className="card-body p-4">
                            <div className="badge badge-secondary">{postByCatagory?.title}</div>
                            <h2 className="card-title">{item?.postTitle}</h2>
                            <div className="badge badge-primary">Author By: {postByAuthor?.name}</div>
                            <p>{item.postDesc}</p>
                            {/* <div className="card-actions justify-end">
                                {
                                    item.tags.map((tag)=>{
                                    <div key={tag?.id} className="badge badge-outline">{tag.name}</div>
                                    })
                                }
                            </div> */}
                        </div>
                    </div>
                    )
                }
                )
            }
        </div>
    )
}
export default ProductCard