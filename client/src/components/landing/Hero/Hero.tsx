import React from "react";
import HeroImg from "../../../assets/Hero/heroImg.png";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={`${styles.left} my-auto`}>
        <div className="pb-5">
          <span className={styles.title}>Exam</span>

          <span className="d-block heading__4 pb-5">
            Easiest way to take exams
          </span>
        </div>
      </div>
      <div className={styles.right}>
        <img src={HeroImg} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
