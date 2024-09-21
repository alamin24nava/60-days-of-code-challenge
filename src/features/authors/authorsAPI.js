const apiUrl = 'http://localhost:3000/authors'

export const getApiAuthors = async()=>{
    const response = await fetch(apiUrl)
    return response.json()
}

