import React from "react";
import Logo from "../../../Assets/Navbar/Logo.svg";

const SidebarLogo = () => {
  return (
    <div className="p-5">
      <img src={Logo} className="img-fluid" alt="Cover Genaretor" />
    </div>
  );
};

export default SidebarLogo;
