import {useRef, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    const [userName, setUserName] = useState('')
    const [luckyNumber, setLuckyNumber] = useState("")
    const [count, setCount] = useState(3)
    const [msg, setMsg] = useState('')
    const [users, setUsers] = useState([]);
    // handleUserName
    const handleUserName = (e) =>{
        setUserName(e.target.value)
    }
    // handleLuckyNumber
    const handleLuckyNumber = (e) =>{
        setLuckyNumber(e.target.value)
    }
    const restAll = () => {
        setUserName("");
        setLuckyNumber("");
        setCount(3);
        setTimeout(()=>{
            setMsg("");
        },2000)
    }

    // handleSubmit
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(userName == '' || luckyNumber == ''){
            return alert('Please fill required field')
        }
        if(count > 0){
            let currentCount = 4-count;
            console.log(typeof currentCount)
            setCount(count - 1);
            let rand = Math.floor(Math.random() * 1);
            if(rand == luckyNumber){
                const user = {
                    id: Date.now(),
                    name: userName,
                    result: `${currentCount}`,
                }
                setUsers([user, ...users])
                setMsg("Success You win")
                restAll()
            }

            if(count <= 1){
                const user = {
                    id: Date.now(),
                    name: userName,
                    result: "0",
                }
                setUsers([user, ...users])
                setMsg("Try again")
                restAll()
            }
        }
    }

    const sortedUser = users.sort((a, b) => {
        if (a.result < b.result) {
          return -1;
        }
        if (a.result > b.result) {
          return 1;
        }
        return 0;
      });

    // console.log(sortedUser)


    return (
        
        <div className="w-25 mx-auto m-5">
            <form onSubmit={handleSubmit}>
                <input onChange={handleUserName} value={userName} type="text" className="form-control mb-2" placeholder="Enter Name"/>
                <input onChange={handleLuckyNumber} value={luckyNumber} type="number" className="form-control text-center mb-2" placeholder="Enter Your Lucky Number" style={{height:'150px'}}/>
                <button className="btn btn-primary w-100" type="submit">Try Your Luck</button>
            </form>
           <p>{msg && msg}</p>
           <p>{count} attempt remaining</p>                   
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Attempt</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedUser.map((data) =>
                            <tr key={data.id}>
                                <td>{data.name}</td>
                                <td>{data.result}</td>
                            </tr>
                        )
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default App
