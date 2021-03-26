import React from "react";
import PropTypes from "prop-types"; //type checking
import _ from "lodash";

//we can also move props directly to stateless functions arguments
//   i.e const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  if (pageCount === 1) return null;

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              onClick={() => onPageChange(page)}
              className="page-link"
              href="/#"
            >
              {/*when we click on page number than the onClick will send this page number to its parent # movies for click handler there the current page gets updated and the props are retransfered to all changed componets and this components get changed , thus this component change page the request goes up it updates and react sends data to updated dom elements*/}
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//if illegal/less prop types are sent than this will show warning in console
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
