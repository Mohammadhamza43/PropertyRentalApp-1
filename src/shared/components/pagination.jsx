import React from 'react';
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

const Pagination = (props) => {
  console.log(typeof props.currentPage + props.currentPage,"currentPage") 
  const pageNumbers = [ ...Array(props.totalPages)].map((el) => el+1);
let data = props.currentPage + 1
console.log(props.currentPage,"props.currentPage")
console.log(data,"data next button")
  return (
    <nav className='d-flex justify-content-center' aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item"><a onClick={props.handlePageChange} className="page-link" data-value={props.currentPage-1} ><AiOutlineLeft/></a></li>
        {
          pageNumbers.map((el,i)=>{
            return(
              <li className="page-item"><a onClick={props.handlePageChange} className="page-link" data-value ={`${i+1}`} >{i+1}</a></li>

            )
          })
        }
        {/* <li className="page-item"><a onClick={props.handlePageChange} className="page-link"data-value='2' >2</a></li>
        <li className="page-item"><a onClick={props.handlePageChange} className="page-link"data-value='3' >3</a></li> */}
        <li className="page-item"><a onClick={props.handlePageChange} className="page-link" data-value={data} ><AiOutlineRight/></a></li>
      </ul>
    </nav>
  );
}

export default Pagination;