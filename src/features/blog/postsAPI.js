export const getPosts = async()=>{
    const response = await fetch('http://localhost:3000/catagories')
    return response.json()
}