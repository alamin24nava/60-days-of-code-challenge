const Toast = (props)=>{
    return (
        <div className="toast toast-top toast-end">
            <div className={`alert alert-${props.status}`}>
                <span>{props.msg}</span>
            </div>
        </div>
    )
}
export default Toast