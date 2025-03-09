import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { processQuery } from "../apis/nlp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search query.");
      setShowModal(true);
      return;
    }

    setLoading(true);

    try {
      const data = await processQuery(query);

      navigate("/search-results", {
        state: {
          results: data.products,
          entities: data.entities,
          userQuery: data.userQuery,
          pagination: {
            totalResults: data.total_results,
            totalPages: data.total_pages,
            currentPage: data.current_page,
            itemsPerPage: data.items_per_page,
          },
        },
      });
    } catch (error) {
      setError(error.message);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full md:w-3/5 flex items-center bg-white border border-slate-300 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-base md:text-lg border rounded-full pl-6 py-4 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-300 shadow-sm focus:shadow-md"
          placeholder="Search medical equipment..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={`absolute top-3 right-2 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 py-1.5 px-2.5 border border-transparent text-center text-sm md:text-base text-white transition-all duration-300 ease-in-out transform ${
            loading
              ? "cursor-wait opacity-70"
              : "hover:scale-110 focus:scale-110 active:scale-100"
          }`}
          type="button"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <div className="loader w-5 h-5 border-2 border-t-2 border-white rounded-full animate-spin"></div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 md:w-6 md:h-6 transform transition-all duration-300 ease-in-out hover:rotate-12"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden md:inline ml-2">Search</span>
            </>
          )}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm md:w-full lg:w-full w-3/4">
            <h2 className="text-lg font-bold text-red-600">
              <FontAwesomeIcon
                className="w-14 h-14 md:w-20 md:h-20"
                icon={faXmark}
              />
            </h2>
            <p className="text-gray-700 mt-2">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
