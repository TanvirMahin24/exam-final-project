import React from "react";
import styles from "./Header.module.css";

const Header = (props: any) => {
  return (
    <div data-aos="fade-down" className={styles.header}>
      {props.children}
    </div>
  );
};

export default Header;
