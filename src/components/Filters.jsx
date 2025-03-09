/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Filters = ({
  className = "",
  filters = {},
  loading,
  onFilterChange,
  selectedFilters,
  setSelectedFilters,
}) => {
  const [openDropdown, setOpenDropdown] = useState("");

  if (loading) return <p>Loading filters...</p>;

  const toggleDropdown = (filterName) => {
    setOpenDropdown(openDropdown === filterName ? "" : filterName);
  };

  const handleFilterSelect = (filterName, value) => {
    const updatedFilters = { ...selectedFilters };

    if (filterName === "condition") {
      updatedFilters[filterName] =
        updatedFilters[filterName] === value.toLowerCase()
          ? ""
          : value.toLowerCase();
    } else {
      if (updatedFilters[filterName].includes(value)) {
        updatedFilters[filterName] = updatedFilters[filterName].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[filterName].push(value);
      }
    }

    setSelectedFilters(updatedFilters);
  };

  const clearFilter = (filterName, value) => {
    const updatedFilters = { ...selectedFilters };

    if (filterName === "condition") {
      updatedFilters[filterName] = "";
    } else {
      updatedFilters[filterName] = updatedFilters[filterName].filter(
        (item) => item !== value
      );
    }

    setSelectedFilters(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      brand: [],
      model: [],
      year: [],
      sales_area: [],
      condition: "",
    };
    setSelectedFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedFilters);
  };

  const hasSelectedFilters = () => {
    return Object.entries(selectedFilters).some(([_, value]) =>
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    );
  };

  const prepareConditions = (conditions) => {
    return Object.entries(conditions).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      count: value,
    }));
  };

  const getFilterLabel = (filterName) => {
    const labels = {
      brand: "Brand",
      model: "Model",
      year: "Year",
      sales_area: "Sales Area",
      condition: "Condition",
    };
    return labels[filterName] || filterName;
  };

  const FilterSection = ({ title, items, name }) => (
    <div className="mb-4">
      <button
        className="flex justify-between w-full text-gray-700 font-medium py-2 border-b"
        onClick={() => toggleDropdown(name)}
      >
        <span>{title}</span>
        {openDropdown === name ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </button>
      <div
        className={`transition-all duration-300 ${
          openDropdown === name ? "h-auto max-h-40" : "h-0"
        } overflow-hidden`}
      >
        <div className="mt-2 overflow-y-auto max-h-40 pr-2">
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item, index) => (
              <label
                key={index}
                className="text-gray-600 py-1 flex justify-between"
              >
                <span>
                  <input
                    type={name === "condition" ? "radio" : "checkbox"}
                    name={name === "condition" ? "condition" : undefined}
                    className="mr-2 md:w-4 md:h-4"
                    value={item.name || item.year || ""}
                    checked={
                      name === "condition"
                        ? selectedFilters[name] === item.name.toLowerCase()
                        : selectedFilters[name].includes(
                            item.name || item.year || ""
                          )
                    }
                    onChange={() =>
                      handleFilterSelect(name, item.name || item.year || "")
                    }
                  />
                  {item.name || item.year}
                </span>
                {item.count && (
                  <span className="text-sm text-gray-500">({item.count})</span>
                )}
              </label>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No options available</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${className} p-4`}>
      {/* Selected Filters Display */}
      {hasSelectedFilters() && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-medium">Selected Filters</h4>
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([filterName, values]) =>
              Array.isArray(values) ? (
                values.map((value, index) => (
                  <span
                    key={`${filterName}-${index}`}
                    className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full flex items-center gap-2"
                  >
                    <span className="text-blue-600 font-medium">
                      {getFilterLabel(filterName)}:
                    </span>
                    {value}
                    <button
                      onClick={() => clearFilter(filterName, value)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : values ? (
                <span
                  key={filterName}
                  className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full flex items-center gap-2"
                >
                  <span className="text-blue-600 font-medium">
                    {getFilterLabel(filterName)}:
                  </span>
                  {values}
                  <button
                    onClick={() => clearFilter(filterName, values)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-4">
        {filters.brands && (
          <FilterSection title="Brand" items={filters.brands} name="brand" />
        )}
        {filters.models && (
          <FilterSection title="Model" items={filters.models} name="model" />
        )}
        {filters.years && (
          <FilterSection title="Year" items={filters.years} name="year" />
        )}
        {filters.salesAreas && (
          <FilterSection
            title="Sales Area"
            items={filters.salesAreas}
            name="sales_area"
          />
        )}
        {filters.conditions && (
          <FilterSection
            title="Condition"
            items={prepareConditions(filters.conditions)}
            name="condition"
          />
        )}
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className={`mt-6 w-full py-2 px-2 rounded-lg transition-colors ${
          hasSelectedFilters()
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!hasSelectedFilters()}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
