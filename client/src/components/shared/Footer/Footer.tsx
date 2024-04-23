import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../assets/Footer/logo.svg";
import AppleImg from "../../../assets/Navbar/AppleAppStore.svg";
import GoogleImg from "../../../assets/Navbar/GooglePlay.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container className="py-5">
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center text-white">
            <img src={logo} alt="Code Generator" />{" "}
            <span className="d-block ms-2 fw-bold">Exam</span>
          </div>

          <div className="d-block pt-3">
            <Link className={styles.footer__link} to="/login">
              Login
            </Link>
            <Link className={styles.footer__link} to="/register">
              Register
            </Link>
            <Link className={styles.footer__link} to="/exams">
              Exams
            </Link>
          </div>

          <div className="d-block pt-3">
            <span className={`d-block lead__2 text-light ${styles.copyright}`}>
              ©{new Date().getFullYear()}{" "}
              <a
                href="https://tanvirmahin.com"
                target="_blank"
                className="text-decoration-none text-white fw-bold me-2"
              >
                Tanvir Mahin
              </a>
              All rights reserved
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
