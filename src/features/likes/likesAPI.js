const apiUrl = 'http://localhost:3000/likes'

export const getApiLikes = async()=>{
    const response = await fetch(apiUrl)
    return response.json()
}
