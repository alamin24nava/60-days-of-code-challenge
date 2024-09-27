let apiUrl = 'http://localhost:3000/posts'



// getApiPosts
export const getApiPosts = async (filterData)=>{
    let newFilter = apiUrl
    if(filterData){
        const {catagorySelect, authorSelect, tagSelect, searchSelect } = filterData
        console.log(tagSelect)
        if(catagorySelect){
            newFilter = `${newFilter}?catagoryId=${catagorySelect}`
        }
        if(authorSelect){
            newFilter = `${newFilter}?authorId=${authorSelect}`
        }
        if(tagSelect){
            newFilter = `${newFilter}?tags=${tagSelect}`
        }
        if(searchSelect){
            newFilter = `${newFilter}?postTitle=${searchSelect}`
        }
    }
    const response = await fetch(newFilter)
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
