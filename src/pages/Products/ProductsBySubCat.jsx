import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faSliders,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Flag from "react-world-flags";

import Filters from "../../components/Filters";
import {
  getAllFiltersForProducts,
  getFilteredProducts,
} from "../../apis/products";
import { countryCodes } from "../../utils/constants";
import Pagination from "../../components/Pagination";
import notFound from "../../assets/404.png";
import ProductDetailModal from "../../components/ProductDetailModal";

const ProductsBySubCat = () => {
  const location = useLocation();
  const { category, subcategory } = location.state || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    model: [],
    year: [],
    sales_area: [],
    condition: "",
  });
  const [filters, setFilters] = useState({});
  const [filterLoading, setFilterLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async (page, filters = {}) => {
    if (!category?.id || !subcategory?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getFilteredProducts(
        category.id,
        subcategory.id,
        page,
        12,
        filters
      );
      setProducts(response.data);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, selectedFilters);
  }, [category?.id, subcategory?.id, currentPage]);

  const fetchFilters = async () => {
    setFilterLoading(true);
    try {
      const data = await getAllFiltersForProducts(category.id, subcategory.id);
      setFilters(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    if (category?.id && subcategory?.id) {
      fetchFilters();
    }
  }, [category?.id, subcategory?.id]);

  const handleFilterChange = async (newFilters) => {
    // Only include non-empty filters
    const cleanFilters = Object.entries(newFilters).reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          acc[key] = value;
        } else if (!Array.isArray(value) && value) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    // Don't clear the filters, just fetch with the new ones
    setCurrentPage(1);
    await fetchProducts(1, cleanFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleFilterDrawer = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const handleProductClick = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="flex flex-wrap justify-evenly gap-8">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="w-[80%] md:w-[calc(26%-1rem)] mb-2 bg-gray-200 animate-pulse rounded-lg"
            style={{ height: "200px" }}
          ></div>
        ))}
      </div>
    );
  }

  if (error) return <p>{error}</p>;
  // if (products.length === 0) return <p>No products found.</p>;
  if (products.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <img src={notFound} alt="No Products" className="w-1/3 mb-4" />
        <p className="text-lg text-gray-700 font-medium">No products found.</p>
        <p className="text-sm text-gray-500">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="bg-white py-10 md:py-12">
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 py-5 md:py-10 flex flex-col justify-center items-center">
          <p className="text-lg md:text-2xl font-semibold">
            Listing for {subcategory?.name}
          </p>
          <span className="flex items-center gap-2 pt-2 text-xs md:gap-4 md:pt-2 md:text-xl">
            <p>Home</p>
            <FontAwesomeIcon
              className="w-4 h-4 md:w-5 md:h-5 text-blue-600"
              icon={faChevronCircleRight}
            />
            <p>{category?.name}</p>
            <FontAwesomeIcon
              className="w-4 h-4 md:w-5 md:h-5 text-blue-600"
              icon={faChevronCircleRight}
            />
            <p>{subcategory?.name}</p>
          </span>
        </div>
        {/* Filters Button for Mobile */}
        <div className="flex gap-3 items-center justify-between mx-4">
          <button
            onClick={toggleFilterDrawer}
            className="md:hidden block bg-blue-600 text-white font-medium py-2 px-5 rounded-lg mt-4"
          >
            <FontAwesomeIcon
              className="mr-1.5 w-4 h-4 text-white"
              icon={faSliders}
            />
            Filters
          </button>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 flex gap-8">
          <div
            className="hidden md:block w-1/5"
            style={{ height: "calc(100vh - 16rem)" }}
          >
            <Filters
              filters={filters}
              loading={filterLoading}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="w-full md:w-4/5 pb-20">
            <div className="flex flex-wrap justify-evenly gap-8">
              {products.map((product) => {
                const salesArea = product.sales_area
                  .replace(/['"]+/g, "")
                  .trim();
                const countryCode = countryCodes[salesArea] || salesArea;

                return (
                  <div
                    key={product.id}
                    className="w-[80%] md:w-[calc(26%-1rem)] mb-2 lg:mb-6 md:mb-5 cursor-pointer bg-white border border-blue-300 rounded-lg shadow-sm hover:shadow-blue-300"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-36 lg:h-44 md:h-40 object-cover rounded-t-lg"
                    />
                    <div className="flex flex-col p-1 gap-2 m-3">
                      <h4 className="text-lg font-medium text-blue-600">
                        {product.name}
                      </h4>
                      <p className="font-medium text-gray-800 mb-2">
                        {product.company_name}
                      </p>
                      <span className="flex items-center justify-between mb-1">
                        <span className="flex gap-2 items-center text-sm text-gray-700">
                          <Flag
                            code={countryCode}
                            className="w-8 h-6 object-cover rounded border-2 border-gray-200"
                          />

                          <p>{product.sales_area}</p>
                        </span>
                        <p className="text-lg font-medium">$ {product.price}</p>
                      </span>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Brand:</span>{" "}
                        {product.brand}
                      </p>
                      <span className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Model:</span>{" "}
                          {product.model}
                        </p>
                        <p className="text-sm font-semibold text-gray-700">
                          {/* <span className="font-semibold">Year:</span>{" "} */}
                          {product.year}
                        </p>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              ↑ Top
            </button> */}

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
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex md:hidden">
          <div className="ml-auto w-4/5 bg-white h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-700">Filters</h3>
              <button
                className="flex items-center"
                onClick={toggleFilterDrawer}
              >
                <FontAwesomeIcon
                  className="w-5 h-5 text-blue-600"
                  icon={faXmark}
                />
              </button>
            </div>
            <div className="h-[calc(100%-4rem)]">
              <Filters
                filters={filters}
                loading={filterLoading}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      )}

      {isModalOpen && selectedProduct && (
        <ProductDetailModal
          productDetails={selectedProduct}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ProductsBySubCat;
