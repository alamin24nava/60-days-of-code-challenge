import 'bootstrap/dist/css/bootstrap.min.css';
import { useReducer } from 'react';
const counterReducer =(state, action)=>{
    switch(action.type){
        case "increase":{
            return state + action.payload
        }
        case "decrease":{
            return state - action.payload
        }
         default:{
            return state
        }
    }
}
function App() {
    const [counter, dispatch] = useReducer(counterReducer, 0)
    return (
    <>
        <h3>The Value of the counter is {counter}</h3>
        <button className='btn btn-primary' onClick={()=>dispatch({type:"increase", payload:1})}>Increase By 1</button>
        <button className='btn btn-danger' onClick={()=>dispatch({type:"decrease", payload:1})}>Decrease By 1</button>
        <button className='btn btn-primary' onClick={()=>dispatch({type:"increase", payload:5})}>Increase By 5</button>
        <button className='btn btn-danger' onClick={()=>dispatch({type:"decrease", payload:3})}>Increase By 3</button>
    </>
    )
}

export default App
