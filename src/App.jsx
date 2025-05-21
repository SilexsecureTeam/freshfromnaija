import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import './index.css';
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Billing from "./pages/Billing";
import TrackOrder from "./pages/TrackOrder";
import TrackOrderMap from "./pages/TrackMap";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Question from "./pages/Question";
import Fun from "./pages/Fun";
import Questonaire from "./pages/Questionaire";
import Dashboard from "./pages/Dashboard";
import MyProducts from "./pages/MyProducts";
import AddProduct from "./pages/AddProduct";

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
        <Route path="/track_map" element={<TrackOrderMap />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/question" element={<Question />} />
        <Route path="/fun_part" element={<Fun />} />
        <Route path="/form" element={<Questonaire />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my_products" element={<MyProducts />} />
        <Route path="/add_product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
