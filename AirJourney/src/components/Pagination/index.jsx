const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxButtons = 3;
  
    // Calculate the range of page numbers to display
    const startPage = Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1;
    const endPage = Math.min(startPage + maxButtons - 1, totalPages);
  
    // Generate page numbers for the current range
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    // .pagination button {
    //     margin: 0 5px;
    //     padding: 5px 10px;
    //     cursor: pointer;
    //   }
      
    //   .pagination button.active {
    //     background-color: #007bff;
    //     color: white;
    //     border: none;
    //     font-weight: bold;
    //   }
      
    //   .pagination button:disabled {
    //     cursor: not-allowed;
    //     opacity: 0.5;
    //   }
      
    return (
      <div className="pagination">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
  
        {/* Page Buttons */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
  
        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  
export default Pagination;
  