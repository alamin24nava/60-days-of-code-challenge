
const Pagination=({_onTotalPage, currentPage ,_onSetCurrentPage})=>{
    const handlePagination =(pageNumber, action)=>{
switch (action) {
    case "current_page":{
        _onSetCurrentPage(pageNumber)
        return
    }

    case "prev_page":{
        if(currentPage > 1){
            _onSetCurrentPage(currentPage - 1)
        }
        return
    }
    case "next_page":{
        if(currentPage < _onTotalPage ){
            _onSetCurrentPage(currentPage + 1)
        }
    }
}
    }
    return(

        <div className="join">
            <button disabled = {currentPage == 1} onClick={()=>handlePagination(null, "prev_page")}className="join-item btn">prev</button>
            {Array.from({length : _onTotalPage}, (_, index)=>{
                // return(<button key={index} onClick={()=>handlePagination(index + 1, "current_page")} className=`join-item btn {current_page == index + 1  && btn-active}` >{index + 1}</button>) 
                return (
                  
                     <button
                      key={index}
                      onClick={() => handlePagination(index + 1, "current_page")}
                      className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                    >
                      {index + 1}
                    </button>

                  );

            })}
             <button disabled = {currentPage == _onTotalPage} onClick={()=>handlePagination(null, "next_page")} className="join-item btn">Next</button>
        </div>
    )
}
export default Pagination