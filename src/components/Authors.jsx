import { useSelector } from "react-redux"
import { fetchCatagories } from "../features/catagories/catagoriesSlice"
const Authors = ()=>{
    const {catagories} = useSelector((state)=> state.catagories)
    console.log(catagories)
    return(
        <>
        <div className="col-6">
             <div className="border rounded-3 p-3">
                <form className="row g-3">
                    <div className="col-auto">
                        <select className="form-select">
                            {
                                catagories.map((item)=>
                                    <option key={item.id} value="1">{item.title}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col-auto">
                        <input type="text" className="form-control" id="inputPassword2" placeholder="Authour Name"/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Create Author</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="col-6">
            <div className="border rounded-3 p-3">
                <h4>Author Lists</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Category ID</th>
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
        </>
    )
}
export default Authors