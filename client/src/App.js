import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Policy from "./pages/Policy.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import PrivateRoute from "./components/Routes/PrivateRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminPrivate from "./components/Routes/AdminPrivate.jsx";
import CartRoute from "./components/Routes/CartRoute.jsx";
import Cart from "./pages/user/Cart.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import AllUsers from "./pages/Admin/AllUsers.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import SingleProduct from "./pages/Admin/UpdateProduct.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Productdetails from "./pages/ProductDetails.jsx";
import Orders from "./pages/user/Orders.jsx";
import AdminOrders from "./pages/Admin/AdminOrders.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/ContactUs" element={<Contact />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminPrivate />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/all-users" element={<AllUsers />} />
          <Route path="admin/all-products" element={<AllProducts />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/cart" element={<CartRoute />}>
          <Route path="cart-products" element={<Cart />} />
        </Route>
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/search/:slug" element={<SearchPage />} />
        <Route path="/product/:slug" element={<Productdetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
