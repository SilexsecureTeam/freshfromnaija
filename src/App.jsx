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
import OrdersReceived from "./pages/OrdersReceived";
import Earnings from "./pages/Earnings";
import Profile from "./pages/Profile";
import RiderLogin from "./pages/RiderLogin";
import RiderRegister from "./pages/RiderRegister";
import RiderQuestonaire from "./pages/RiderQuestionaire";
import RiderDashboard from "./pages/RiderDashboard";
import RiderShipments from "./pages/RiderShipments";
import ProofOfDelivery from "./pages/ProofDelivery";
import RiderNotification from "./pages/RiderNotification";
import RiderEarnings from "./pages/RiderEarning";
import RiderProfile from "./pages/RiderProfile";
import UserSignUp from "./pages/UserSignUp";
import UserLogin from "./pages/UserLogin";
import UserOrders from "./pages/UserOrders";
import UserMessages from "./pages/UserMessages";
import UserAddresses from "./pages/UserAddresses";
import UserWishList from "./pages/UserWishlist";
import UserRecentlyViewed from "./pages/UserRecentlyViewed";
import UserAccountSettings from "./pages/UserAccountSettings";
import UserOTP from "./pages/UserOTP";
import UserForgotPass from "./pages/UserForgotPass";
import UserResetPass from "./pages/UserResetPass";

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
        <Route path="/product_details/:id" element={<ProductDetails />} />
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
        <Route path="/orders_received" element={<OrdersReceived />} />
        <Route path="/earnings&payouts" element={<Earnings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rider_login" element={<RiderLogin />} />
        <Route path="/rider_register" element={<RiderRegister />} />
        <Route path="/rider_form" element={<RiderQuestonaire />} />
        <Route path="/rider_dashboard" element={<RiderDashboard />} />
        <Route path="/rider_shipments" element={<RiderShipments />} />
        <Route path="/proof_of_delivery" element={<ProofOfDelivery />} />
        <Route path="/rider_notifications" element={<RiderNotification />} />
        <Route path="/rider_earnings" element={<RiderEarnings />} />
        <Route path="/rider_profile" element={<RiderProfile />} />
        <Route path="/user_register" element={<UserSignUp />} />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/user_orders" element={<UserOrders />} />
        <Route path="/user_messages" element={<UserMessages />} />
        <Route path="/user_address" element={<UserAddresses />} />
        <Route path="/user_wishlist" element={<UserWishList />} />
        <Route path="/user_recently-viewed" element={<UserRecentlyViewed />} />
        <Route path="/user_account-settings" element={<UserAccountSettings />} />
        <Route path="/user_otp" element={<UserOTP />} />
        <Route path="/user_forgot_pass" element={<UserForgotPass />} />
        <Route path="/user_reset_pass" element={<UserResetPass />} />
      </Routes>
    </Router>
  );
}

export default App;
