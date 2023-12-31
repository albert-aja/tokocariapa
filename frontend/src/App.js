import "./App.css";
import Header from "./components/layout/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginRegister from "./components/User/LoginRegister";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import Cart from "./components/Cart/Cart.js";
// import Loader from "./components/layout/Loader/Loader";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route path="/Cart" component={Cart} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginRegister} />
      <ProtectedRoute exact path="/akun" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      {/* <Route exact path="/load" component={Loader} /> */}
      <Footer />
    </Router>
  );
}

export default App;
