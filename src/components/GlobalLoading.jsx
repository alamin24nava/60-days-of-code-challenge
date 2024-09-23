const GlobalLoading = ()=>{
    return(
        <div className="h-full w-full fixed start-0 top-0 bg-slate-700 opacity-60">
            <div className="h-full w-full flex align-middle justify-center">
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        </div>
    )
}
export default GlobalLoading