import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxButtons = 3;

  // Define range of page numbers to display
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(maxButtons / 2), totalPages - maxButtons + 1)
  );
  const endPage = Math.min(startPage + maxButtons - 1, totalPages);

  // Create an array of page numbers to display
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const styles = {
    button: {
      margin: "0 5px",
      padding: "5px 10px",
      cursor: "pointer",
      borderRadius: "5px",
    },
    activeButton: {
      border: "3px solid #7126B5",
      background: "white",
      color: "#7126B5",
      fontWeight: "bold",
    },
    disabledButton: {
      border: "2px solid #83768f",
      background: "#f5f5f5",
      color: "#83768f",
      cursor: "default",
      opacity: 0.5,
    },
  };

  if (!totalPages || totalPages < 1) return null;

  return (
    <div>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...styles.button,
          ...(currentPage === 1 ? styles.disabledButton : {}),
        }}
        aria-label="Pindah ke halaman sebelumnya"
      >
        <ChevronLeftRounded fontSize="medium" />
      </button>

      {/* Page Buttons */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            ...styles.button,
            ...(page === currentPage ? styles.activeButton : {}),
          }}
          aria-label={`Pindah ke halaman ${page}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...styles.button,
          ...(currentPage === totalPages ? styles.disabledButton : {}),
        }}
        aria-label="Pindah ke halaman berikutnya"
      >
        <ChevronRightRounded fontSize="medium" />
      </button>
    </div>
  );
};

export default Pagination;
