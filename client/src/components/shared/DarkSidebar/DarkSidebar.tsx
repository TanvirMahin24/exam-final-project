import React from "react";
import darkSidebarImg from "../../../assets/DarkSidebar/DarkSidebar.png";
import styles from "./DarkSidebar.module.css";

const DarkSidebar = () => {
  return (
    <div className={styles.darkSidebar} data-aos="fade-left">
      <img src={darkSidebarImg} alt="" className={styles.img} />
    </div>
  );
};

export default DarkSidebar;
