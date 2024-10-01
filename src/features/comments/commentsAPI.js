const apiUrl = 'http://localhost:3000/comments'

export const getApiComments = async()=>{
    const response = await fetch(apiUrl)
    return response.json()
}

export const postApiComments = async(newComment)=>{
    const response = await fetch("http://localhost:3000/comments",
        {
            method:"POST",
            body:JSON.stringify(newComment),
            headers:{"Content-type":"application/json"}
        }
    )
    return response.json()
}