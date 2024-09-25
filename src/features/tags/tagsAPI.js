const apiUrl = 'http://localhost:3000/tags'

// getApiTags
export const getApiTags = async ()=>{
    const response = await fetch(apiUrl)
    return response.json()
}
export const getApiTagsByName = async (tagName)=>{
    const response = await fetch(`${apiUrl}?name=${tagName}`)
    return response.json()
}

// postApiTags
export const postApiTags = async (newTag)=>{
    const response = await fetch(apiUrl,

        {
            method:"POST",
            body:JSON.stringify(newTag),
            headers:{"Content-type":"application/json"}
        }
    )
    return response.json()
}
// updateApiTags
export const updateApiTags = async (tag)=>{
    console.log(tag)
    const response = await fetch(`${apiUrl}/${tag.id}`,
        {
            method:"PUT",
            body:JSON.stringify(tag),
            headers:{"Content-type":"application/json"}
        }
    )
    return response.json()
}
// deleteApiTags
export const deleteApiTags = async (tagId)=>{
    const response = await fetch(`${apiUrl}/${tagId}`,{method:"DELETE"})
    return response.json()
}
