import React from "react";
import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/logo.png";
import logo from "../../../images/todoroki.png";

const options = {
  burgerColorHover: "#7C7CFD",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#7C7CFD",
  link1Text: "Beranda",
  link2Text: "Produk",
  link3Text: "Kontak",
  link4Text: "Tentang",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35,35,35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#7C7CFD",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35,35,35,0.8)",
  searchIconColor: "rgba(35,35,35,0.8)",
  cartIconColor: "rgba(35,35,35,0.8)",
  profileIconColorHover: "#7C7CFD",
  searchIconColorHover: "#7C7CFD",
  cartIconColorHover: "#7C7CFD",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
