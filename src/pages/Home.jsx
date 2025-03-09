import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { getAllCategories } from "../apis/products";

import Categories from "../components/Categories";
import Search from "../components/Search";

import { categoryIcons } from "../utils/constants";
import blob from "../assets/blob.svg";
import { getCachedCategories } from "../utils/getCachedCategories";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const data = await getAllCategories();
  //       const categoriesWithIcons = data.map((category) => ({
  //         ...category,
  //         icon: categoryIcons[category.name] || faPlus,
  //       }));
  //       setCategories(categoriesWithIcons);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  //* with caching in local storage
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCachedCategories(getAllCategories);
        const categoriesWithIcons = data.map((category) => ({
          ...category,
          icon: categoryIcons[category.name] || faPlus,
        }));
        setCategories(categoriesWithIcons);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    //to get all data of selected category
    // setSelectedCategory(category);
    const { id, name } = category;
    const selectedCategoryData = { id, name };
    setSelectedCategory(selectedCategoryData);
    console.log("Selected category:", selectedCategoryData);
  };

  const handleSubcategorySelect = (subcategory, category) => {
    setSelectedSubcategory(subcategory);

    navigate("/products", {
      state: {
        category: { id: category.id, name: category.name },
        subcategory: { id: subcategory.id, name: subcategory.name },
      },
    });

    console.log("Navigating to ProductsBySubCat with:", {
      category: { id: category.id, name: category.name },
      subcategory: { id: subcategory.id, name: subcategory.name },
    });
  };

  return (
    <>
      <section className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-10">
          {/* Top-Left Blob */}
          <div className="hidden md:block">
            <img
              src={blob}
              alt="blob1"
              className="absolute md:top-[-15px] md:left-[70px] w-40 h-40 md:w-64 md:h-64 opacity-30 transform rotate-45"
            />
          </div>

          {/* Bottom-Left Blob */}
          <div className="hidden md:block">
            <img
              src={blob}
              alt="blob2"
              className="absolute bottom-[-50px] left-[-40px] w-64 h-64 md:w-64 md:h-64 opacity-20 transform rotate-12"
            />
          </div>

          {/* Top-Right Blob */}
          <div className="hidden md:block">
            <img
              src={blob}
              alt="blob3"
              className="absolute top-[50px] right-[-10px] w-48 h-48 md:w-56 md:h-56 opacity-25 transform rotate-12"
            />
          </div>

          {/* Bottom-Right Blob */}
          <div className="hidden md:block">
            <img
              src={blob}
              alt="blob4"
              className="absolute bottom-[-80px] right-[-40px] w-72 h-72 md:w-80 md:h-80 opacity-30 transform rotate-180"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find & Buy <span className="text-blue-600">Medical Equipment</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Discover a wide range of medical equipment, connect with suppliers,
            and get the best deals.
          </p>

          <Search />
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-100 via-white to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Popular Categories
          </h2>
          <p className=" text-gray-500 text-center mb-12">
            <strong>26</strong> Major Categories and <strong>600+</strong>{" "}
            Subcategories to browse from...
          </p>

          <Categories
            categories={categories}
            onCategorySelect={handleCategorySelect}
            onSubcategorySelect={handleSubcategorySelect}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
