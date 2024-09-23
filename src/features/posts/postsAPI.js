const apiUrl = 'http://localhost:3000/posts'
// getApiPosts
export const getApiPosts = async ()=>{
    const response = await fetch(apiUrl)
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
export const updateApiPosts = async (post)=>{
    console.log(post)
    const response = await fetch(`${apiUrl}/${post.id}`,
        {
            method:"PUT",
            body:JSON.stringify(post),
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
