import {useState} from "react"
function App() {
    const [counter, setCounter] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const increaseHandler = () =>{
        setCounter(counter +1)
    }
    const decreaseHandler = () =>{
        setCounter(counter -1)
    }
    const increaseHandler2 = () =>{
        setCounter2(counter2 +1)
    }
    const decreaseHandler2 = () =>{
        setCounter2(counter2 -1)
    }


    return (
        <>
            <div>
                The value of the counter {counter}
                <div>
                <button onClick={increaseHandler}>Increase by 1</button>
                <button onClick={decreaseHandler}>Decrease by 1</button>
                </div>
            </div>
            <br/>
            <div>
                The value of the counter {counter2} Other state
                <div>
                <button onClick={increaseHandler2}>Increase by 1</button>
                <button onClick={decreaseHandler2}>Decrease by 1</button>
                </div>
            </div>
        </>
    )
}

export default App
