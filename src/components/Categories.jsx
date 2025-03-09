/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faAnglesDown,
  faAnglesUp,
} from "@fortawesome/free-solid-svg-icons";

const Categories = ({ categories, onCategorySelect, onSubcategorySelect }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDropdown = (index, category) => {
    setOpenCategory(openCategory === index ? null : index);
    if (openCategory !== index && onCategorySelect) {
      onCategorySelect(category); // Pass the clicked category's data
    }
  };

  const visibleCategories = showAll
    ? categories
    : window.innerWidth < 768
    ? categories.slice(0, 5) // Show 5 categories on mobile
    : categories.slice(0, 12); // Show 3 rows of 4 categories on desktop

  return (
    <div className="relative">
      <div
        className={`flex flex-wrap justify-center gap-6 ${
          showAll ? "h-96 overflow-y-auto" : ""
        }`}
      >
        {visibleCategories.map((category, index) => (
          <div
            key={category.id}
            className="relative w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.75rem)]"
          >
            <div className="bg-white border rounded-lg shadow-sm overflow-visible">
              <button
                className="w-full flex items-center justify-between p-4 text-left group"
                onClick={() => toggleDropdown(index, category)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-blue-500 group-hover:text-blue-700 transition ease-in-out">
                    <FontAwesomeIcon className="w-8 h-8" icon={category.icon} />
                  </div>
                  <span className="font-medium text-gray-800">
                    {category.name}
                  </span>
                </div>
                <FontAwesomeIcon
                  icon={openCategory === index ? faChevronUp : faChevronDown}
                  className="text-gray-500"
                />
              </button>

              {openCategory === index && category.subcategories.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-50">
                  <ul className="space-y-1 py-2 px-4 max-h-48 overflow-y-auto">
                    {category.subcategories.map((sub) => (
                      <li
                        key={sub.id}
                        className="text-gray-700 hover:bg-blue-50 cursor-pointer px-2 py-1 rounded"
                        onClick={() => onSubcategorySelect(sub, category)}
                      >
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition ${
            isHovered ? "jump" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {showAll ? (
            <>
              Show Less <FontAwesomeIcon className="ml-1" icon={faAnglesUp} />
            </>
          ) : (
            <>
              Show All <FontAwesomeIcon className="ml-1" icon={faAnglesDown} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Categories;
