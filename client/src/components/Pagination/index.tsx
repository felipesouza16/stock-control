interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handleClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="btn-group">
      <button
        className="btn"
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
      >
        «
      </button>
      <button className="btn">Page {currentPage}</button>
      <button
        className="btn"
        disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
};
