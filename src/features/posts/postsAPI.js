let apiUrl = 'http://localhost:3000/posts'
// getApiPosts
export const getApiPosts = async (filterData)=>{
    let newUrl
    if(filterData){
        const {catagorySelect, authorSelect, tagSelect, searchSelect,limit, page } = filterData
        newUrl = `${apiUrl}?_page=${page}&_limit=${limit}`
        if(catagorySelect && authorSelect && searchSelect){
            newUrl = `${newUrl}&catagoryId=${catagorySelect}&authorId=${authorSelect}&postTitle=${searchSelect}`
        }else if(catagorySelect && authorSelect){
            newUrl = `${newUrl}&catagoryId=${catagorySelect}&authorId=${authorSelect}`
        }else if(catagorySelect){
            newUrl = `${newUrl}&catagoryId=${catagorySelect}`
        }else if(authorSelect){
            newUrl = `${newUrl}&authorId=${authorSelect}`
        }else if(searchSelect){
            newUrl = `${newUrl}&postTitle=${searchSelect}`
        }else if(tagSelect){
            newUrl = `${newUrl}&tags=${tagSelect}`
        }
    }
    const response = await fetch(newUrl)
    return response.json()
}
export const singlePostApi = async (id)=>{
    const response = await fetch(`${apiUrl}/${id}`)
    return response.json()
}

// postApiPosts
export const postApiPosts = async (newPost)=>{
    const response = await fetch(apiUrl,
        {
            method:"POST",
            body:JSON.stringify(newPost),
            headers:{"Content-type":"application/json"}
        }
    )
    return response.json()
}
// updateApiPosts
export const updateApiPosts = async ({editablePost,dispatchUpdatePosts })=>{
    const {selectCatagory, selectAuthor, postTitle, postDesc} = dispatchUpdatePosts

    const {id, ...rest} = editablePost;
    const updatedPost = {...rest, catagoryId:selectCatagory, authorId:selectAuthor, postDesc:postDesc, postTitle:postTitle}
    
    const response = await fetch(`${apiUrl}/${id}`,
        {
            method:"PUT",
            body:JSON.stringify(updatedPost),
            headers:{"Content-type":"application/json"}
        }
    )
    return response.json()
}
// deleteApiPosts
export const deleteApiPosts = async (postId)=>{
    const response = await fetch(`${apiUrl}/${postId}`,{method:"DELETE"})
    return response.json()
}
