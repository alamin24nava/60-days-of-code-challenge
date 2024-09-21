let apiUrl = 'http://localhost:3000/catagories'
// getApiCatagories
export const getApiCatagories = async()=>{
    const response = await fetch(apiUrl)
    return response.json()
}
// postApiCatagories
export const postApiCatagories = async(newCatagory)=>{
    const response = await fetch(apiUrl, {
        method:"POST",
        body: JSON.stringify(newCatagory),
        headers:{
            "Content-type":"application/json"
        }
    })
    return response.json()
}

export const updateApiCatagories = async(catagory)=>{
    const response = await fetch(`${apiUrl}/${catagory.id}`, {
        // method:"PUT",
        // body: JSON.stringify(newCatagory),
        // headers:{
        //     "Content-type":"application/json"
        // }
    })
    return response.json()
}
// deleteApiCatagories
export const deleteApiCatagories = async(catagoryId)=>{
    const response = await fetch(`${apiUrl}/${catagoryId}`, {method:"DELETE"})
    return response
}
