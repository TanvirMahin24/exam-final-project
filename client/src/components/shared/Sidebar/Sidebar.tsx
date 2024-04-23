import React from "react";
import styles from "./Sidebar.module.css";
import SidebarLogo from "./SidebarLogo/SidebarLogo";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <SidebarLogo />
    </div>
  );
};

export default Sidebar;
