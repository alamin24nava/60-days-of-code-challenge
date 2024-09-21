const apiUrl = 'http://localhost:3000/authors'

export const getApiAuthors = async()=>{
    const response = await fetch(apiUrl)
    return response.json()
}


export const postApiAuthors = async(newAuthor)=>{
    const response = await fetch('http://localhost:3000/authors',
        {
            method:"POST",
            body:JSON.stringify(newAuthor),
            headers:{"Content-type":"application/json"}
        }
    )
    return response.json()
}
