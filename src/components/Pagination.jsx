/* eslint-disable react/prop-types */
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 ${
            i === currentPage ? "bg-purple-100 text-purple-700" : "bg-white"
          } hover:bg-purple-100`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center space-x-2 mt-4">
        <button
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-full border ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-purple-100"
          }`}
        >
          First
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-full border ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-purple-100"
          }`}
        >
          Last
        </button>
      </div>
    </>
  );
};

export default Pagination;
