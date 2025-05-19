import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import './index.css';
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Billing from "./pages/Billing";
import TrackOrder from "./pages/TrackOrder";


// ScrollToTop logic directly in App.jsx
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product_details" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/track_order" element={<TrackOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
