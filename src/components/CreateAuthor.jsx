import { useSelector } from "react-redux"
const CreateAthour = ()=>{
    const {catagories} = useSelector((state)=> state.blog)
    console.log(catagories)
    return(
        <div className="col-6">
             <div className="border rounded-3 p-3">
                <form className="row g-3">
                    <div className="col-auto">
                        <select className="form-select">
                            {
                                catagories.map((item)=>
                                    <option key={item.id} value="1">{item.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col-auto">
                        <input type="text" className="form-control" id="inputPassword2" placeholder="Authour Name"/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateAthour