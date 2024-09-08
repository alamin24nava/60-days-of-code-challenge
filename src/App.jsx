import {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    const [user, setUser] = useState('');
    const [luckyNumber, setLuckyNumber] = useState('');
    const [attempt, setAttempt] = useState(1);
    const [userList, setUserList] = useState([])
    const [result, setResult] = useState('')
    // Generate a Random Number

    // handle Change Name
    const handleChangeName = (e) =>{
        setUser(e.target.value)
    }
    // handle Change Number
    const handleChangeNumber = (e) =>{
        setLuckyNumber(e.target.value)
        const numberLength = e.target.value.length
    }
    const randomNumberInRange = () => {
        return Math.floor(Math.random() * 10);
    };
    // handle Submit
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(user.trim() === '' || luckyNumber.trim() === ''){
            return alert('Please Provide info')
        }
        const newList = {
            id: Date.now() + "",
            user: user,
            result:result,
        }
        setUserList([newList, ...userList])
        setUser('')
        setLuckyNumber('')
        setAttempt(attempt + 1)

        if(randomNumberInRange() == luckyNumber && attempt == 1){
            setResult(`${attempt}st Time Win`)
        }else if(randomNumberInRange() == luckyNumber && attempt == 2){
            setResult(`${attempt}nd Time Win`)
        }else if(randomNumberInRange() == luckyNumber && attempt == 3){
            setResult(`${attempt}rd Time Win`)
        }else{
            setResult(`N/A`)
        }

        // console.log(`random ${randomNumberInRange()}`)
        // console.log(`luck ${luckyNumber}`)
    }
    console.log(userList)
    return (
        
        <div className="w-25 mx-auto m-5">
            <form onSubmit={handleSubmit}>
                {/* <input onChange={handleChangeName} value={user} type="text" className="form-control mb-2" placeholder="Enter Name"/> */}
                <input onChange={handleChangeName} value={user} type="text" className={`${attempt <= 3 ? 'form-control mb-2':'form-control mb-2 disabled'}`} placeholder="Enter Name"/>
                <input onChange={handleChangeNumber} value={luckyNumber} type="number" className="form-control text-center mb-2" max={9} placeholder="Enter Your Lucky Number" style={{height:'150px'}}/>
                { attempt <= 3 ? (
                    <button className="btn btn-primary" type="submit">Try Your Luck</button>
                ) : null}
            </form>
           
            { attempt <= 3 ? (
                <p><span></span> You Can Try {attempt} / 3  Times</p>
            ) : <p className="text-danger">You are Loss</p>}

            {userList.length !== 0 ? (
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Attempt</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((singleUser) => 
                            <tr key={singleUser.id}>
                                <td>{singleUser.user}</td>
                                <td>{singleUser.result}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>):null}
        </div>
    )
}

export default App
