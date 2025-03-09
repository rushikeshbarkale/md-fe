import { useLocation, useNavigate } from "react-router-dom";
import Flag from "react-world-flags";

import "../../App.css";

import { countryCodes } from "../../utils/constants";
import { processQuery } from "../../apis/nlp";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import notFound from "../../assets/404.png";

const ProductSearchByQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    results = [],
    userQuery,
    entities,
    pagination = {},
  } = location.state || {};

  const [currentPage, setCurrentPage] = useState(pagination.currentPage || 1);
  const [products, setProducts] = useState(results);
  const [loading, setLoading] = useState(false);

  const { totalResults = 0, totalPages = 0, itemsPerPage = 10 } = pagination;

  const handlePageChange = async (newPage) => {
    setLoading(true);
    try {
      const data = await processQuery(userQuery, newPage);
      setCurrentPage(newPage);
      setProducts(data.products);

      navigate("/search-results", {
        state: {
          results: data.products,
          entities: data.entities,
          userQuery,
          pagination: {
            totalResults: data.total_results,
            totalPages: data.total_pages,
            currentPage: data.current_page,
            itemsPerPage: data.items_per_page,
          },
        },
        replace: true,
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <img
          src={notFound}
          alt="No Results Found"
          className="mx-auto w-64 h-64"
        />
        <h1 className="text-3xl font-bold text-gray-800">No Results Found</h1>
        <p className="text-gray-600">Please try a different query.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-800 text-center mb-4">
        Search Results for: <span className="text-blue-600">{userQuery}</span>
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Found {totalResults} results across {totalPages} pages
      </p>

      <div className="flex flex-wrap justify-evenly gap-8 mb-8">
        {products.map((product) => {
          const location = product.Location?.replace(/['"]+/g, "").trim();
          const countryCode = countryCodes[location] || location;

          return (
            <div
              key={product.Product_ID}
              className="w-[80%] md:w-[calc(21%-1rem)] mb-2 lg:mb-6 md:mb-5 cursor-pointer bg-white border border-blue-300 rounded-lg shadow-sm hover:shadow-blue-300"
            >
              <img
                src={product.Image_URL}
                alt={product.Name}
                className="w-full h-36 lg:h-44 md:h-40 object-cover rounded-t-lg"
              />
              <div className="flex flex-col p-1 gap-2 m-3">
                <h4 className="text-lg font-medium text-blue-600">
                  {product.Name}
                </h4>
                <span className="flex items-center justify-between mb-1">
                  <span className="flex gap-2 items-center text-sm text-gray-700">
                    <Flag
                      code={countryCode}
                      className="w-8 h-6 object-cover rounded border-2 border-gray-200"
                    />
                    <p>{product.Location}</p>
                  </span>
                  <p className="text-lg font-medium">${product.Price}</p>
                </span>
                <p className="text-sm font-medium text-gray-800">
                  <span className="font-semibold">Brand:</span> {product.Brand}
                </p>
                <span className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-800">
                    <span className="font-semibold">Model:</span>{" "}
                    {product.Model}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    <span className="font-semibold">{product.Year}</span>
                  </p>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div
          className="sticky bottom-0 bg-white py-2 border-t border-gray-300"
          style={{ zIndex: 10 }}
        >
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductSearchByQuery;
