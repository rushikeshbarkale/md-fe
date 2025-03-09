import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./layout/Layout";

//pages
import Home from "./pages/Home";
import ProductsBySubCat from "./pages/Products/ProductsBySubCat";
import ProductSearchByQuery from "./pages/Products/ProductSearchByQuery";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<ProductsBySubCat />} />
            <Route path="/search-results" element={<ProductSearchByQuery />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
