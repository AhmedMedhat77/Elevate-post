import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const [currentPageState, setCurrentPageState] = useState(currentPage || 1);

  const handlePageChange = (page: number) => {
    setCurrentPageState(page);
    onPageChange(page);
  };

  const onPreviousPage = () => {
    if (currentPageState === 1) return;
    setCurrentPageState(currentPageState - 1);
    onPageChange(currentPageState - 1);
  };

  const onNextPage = () => {
    if (currentPageState === totalPages) return;
    setCurrentPageState(currentPageState + 1);
    onPageChange(currentPageState + 1);
  };

  const onFirstPage = () => {
    if (currentPageState === 1) return;
    setCurrentPageState(1);
    onPageChange(1);
  };

  const onLastPage = () => {
    if (currentPageState === totalPages) return;
    setCurrentPageState(totalPages);
    onPageChange(totalPages);
  };

  // Compute current 2-page group: [1,2], [3,4], [5,6], ...
  const pairStart = Math.floor((currentPageState - 1) / 2) * 2 + 1;
  const pairPages = [pairStart, pairStart + 1].filter((p) => p <= totalPages);

  return (
    <div className="flex flex-row items-center gap-2">
      <button className="pagination-button" onClick={onFirstPage}>
        <ChevronsLeft strokeWidth={0.75} />
      </button>
      <button className="pagination-button" onClick={onPreviousPage}>
        <ChevronLeft strokeWidth={0.75} />
      </button>

      {pairStart > 1 && <span>...</span>}

      {pairPages.map((page) => (
        <span
          key={page}
          onClick={() => handlePageChange(page)}
          className={` pagination-number ${page === currentPageState && "bg-[#2F80ED] text-white"}`}
        >
          {page}
        </span>
      ))}

      {pairPages[pairPages.length - 1] < totalPages && <span>...</span>}

      {/* Show last page only when current page is not the last page */}
      {currentPageState !== totalPages && (
        <span className="pagination-number" onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </span>
      )}

      <button className="pagination-button" onClick={onNextPage}>
        <ChevronRight strokeWidth={0.75} />
      </button>
      <button className="pagination-button" onClick={onLastPage}>
        <ChevronsRight strokeWidth={0.75} />
      </button>
    </div>
  );
};

export default Pagination;
