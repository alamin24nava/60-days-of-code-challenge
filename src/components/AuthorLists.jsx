const AuthorLists =()=>{
    return(
        <div className="col-6">
            <div className="border rounded-3 p-3">
                <h3>Category Lists</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Category Name</th>
                            <th className="text-end">Author Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bangladesh</td>
                            <td>
                                <div className="d-flex gap-2 justify-content-end">
                                    <span>Alamin</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AuthorLists