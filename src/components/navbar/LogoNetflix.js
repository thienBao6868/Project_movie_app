import React from "react";
import logo from "../../assets/images/logo.png";
import "./Navbar.css";
//import { Link } from "react-router-dom";
const LogoNetflix = () => {
  return (
    <div className="logo_Netflix">
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default LogoNetflix;
