import PostCard from "../components/PostCard"
import Pagination from "../components/Pagination"
import { useEffect, useState } from "react"
import {getPosts, usePostsGetSelector} from "../features/posts/postsSlice"
import { useDispatch, useSelector } from "react-redux"
const Archive = ()=>{
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(4)
    const totalPost = 8;


    const dispatch = useDispatch()

    // const handlePagination =(pagination)=>{
    //     setTotalPage
    // }
    useEffect(()=>{
        setTotalPage(Math.ceil(totalPost / limit))
        dispatch(getPosts({
            page:currentPage,
            limit:limit
        }))
    }, [currentPage, dispatch, limit, totalPage])
    
    return(
        <>
            <PostCard currentPage = {currentPage} limit={limit} setCurrentPage = {setCurrentPage}/>
            <Pagination currentPage = {currentPage} _onSetCurrentPage = {setCurrentPage}  _onTotalPage = {totalPage}/>
        </>
    )
}
export default Archive