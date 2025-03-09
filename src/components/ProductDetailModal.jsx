/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHeadset } from "@fortawesome/free-solid-svg-icons";
import Flag from "react-world-flags";

import { countryCodes } from "../utils/constants";

const ProductDetailModal = ({ productDetails, onClose }) => {
  const salesArea = productDetails.sales_area.replace(/['"]+/g, "").trim();
  const countryCode = countryCodes[salesArea] || salesArea;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="relative w-[90%] md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col w-full md:w-1/2">
              <div className="relative group">
                <img
                  src={productDetails.image_url}
                  alt={productDetails.name}
                  className="w-full aspect-square object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-300 shadow-md hover:shadow-lg">
                  <FontAwesomeIcon className="w-5 h-5" icon={faHeadset} />
                  <span className="font-semibold">Contact Seller</span>
                </button>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-300 shadow-md hover:shadow-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-semibold">Chat on WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {productDetails.name}
                </h2>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {productDetails.condition}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Brand</span>
                  <span className="text-gray-800 font-medium">
                    {productDetails.brand}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Model</span>
                  <span className="text-gray-800 font-medium">
                    {productDetails.model}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Shipping from</span>
                  <span className="flex gap-2 items-center text-gray-800 font-medium">
                    <Flag
                      code={countryCode}
                      className="w-8 h-6 object-cover rounded border-2 border-gray-200"
                    />
                    {productDetails.sales_area}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Company Name</span>
                  <span className="text-gray-800 font-medium">
                    {productDetails.company_name}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Details</span>
                  <p className="text-gray-800 leading-relaxed">
                    {productDetails.description}
                  </p>
                </div>
                {/* <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Supplier Email</span>
                  <span className="text-gray-800 font-medium">
                    {productDetails?.contact_info?.email}
                  </span>
                </div> */}
              </div>

              <div className="mt-auto">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-blue-600">
                    ${productDetails.price}
                  </span>
                  <span className="text-sm text-gray-500">USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
