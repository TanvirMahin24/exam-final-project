import {
  IconClipboardList,
  IconClipboardPlus,
  IconClipboardTypography,
  IconConfetti,
  IconHome,
  IconLogout,
  IconMenu2,
  IconSettings,
} from "@tabler/icons-react";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import logo from "../../../assets/Footer/logo.svg";
import AnimatedBg from "../AnimatedBg/AnimatedBg";
import JoinExamCard from "../JoinExamCard/JoinExamCard";
import { useDispatch, useSelector } from "react-redux";
import { logout, setJoinModal } from "../../../redux/slices/authSlice";
import { RootState } from "../../../redux/store";

const Layout = ({ title, children }: any) => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/");
    }
  }, [isAuth]);

  const logoutHandeler = async () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <Container fluid>
        <Row className="position-relative">
          <Col
            md={3}
            lg={2}
            className={`px-4 ${styles.wrapper} ${show ? styles.active : ""}`}
          >
            <div className="d-flex justify-content-between align-items-center w-100">
              <Link
                to="/dashboard"
                className="d-flex align-items-center pt-3 text-decoration-none text-dark"
              >
                <div className="pb-3">
                  <div className="d-flex align-items-center text-dark">
                    <img src={logo} alt="Code Generator" />{" "}
                    <span className="d-block ms-2 fw-bold">Exam</span>
                  </div>
                </div>
              </Link>
              <div
                className={`${styles.ham}  ms-auto`}
                onClick={() => setShow(!show)}
              >
                <IconMenu2 />
              </div>
            </div>

            <div className={styles.nav}>
              <NavLink to="/dashboard" className={styles.nav__item}>
                <span className={styles.icon}>
                  <IconHome />
                </span>
                <span className={styles.nav__item_text}>Dashboard</span>
              </NavLink>
            </div>
            <div className="">
              <div className={styles.nav}>
                <span
                  className={styles.nav__item}
                  onClick={() => dispatch(setJoinModal(true))}
                >
                  <span className={styles.icon}>
                    <IconClipboardPlus />
                  </span>
                  <span className={styles.nav__item_text}>Join Exam</span>
                </span>
              </div>
            </div>
            <div className="">
              <div className={styles.nav}>
                <NavLink to="/results" className={styles.nav__item}>
                  <span className={styles.icon}>
                    <IconConfetti />
                  </span>
                  <span className={styles.nav__item_text}>Results</span>
                </NavLink>
              </div>
            </div>
            <div className="">
              <div className={styles.nav}>
                <NavLink to="/create-exam" className={styles.nav__item}>
                  <span className={styles.icon}>
                    <IconClipboardTypography />
                  </span>
                  <span className={styles.nav__item_text}>Create Exam</span>
                </NavLink>
              </div>
            </div>
            <div className="">
              <div className={styles.nav}>
                <NavLink to="/my-exams" className={styles.nav__item}>
                  <span className={styles.icon}>
                    <IconClipboardList />
                  </span>
                  <span className={styles.nav__item_text}>My Exams</span>
                </NavLink>
              </div>
            </div>
            <div className="">
              <div className={styles.nav}>
                <NavLink to="/settings" className={styles.nav__item}>
                  <span className={styles.icon}>
                    <IconSettings />
                  </span>
                  <span className={styles.nav__item_text}>Settings</span>
                </NavLink>
              </div>
            </div>

            <div className={styles.nav}>
              <div className={styles.nav__item} onClick={logoutHandeler}>
                <span className={styles.icon}>
                  <IconLogout />
                </span>
                <span className={styles.nav__item_text}>Logout</span>
              </div>
            </div>
          </Col>
          <Col md={9} lg={10} className={styles.bg}>
            <div className="d-flex justify-content-end align-items-center py-4">
              <div
                className={`${styles.ham_top}  ms-auto`}
                onClick={() => setShow(!show)}
              >
                <IconMenu2 />
              </div>
              {/* <div className="pb-3">
                  <img src={logo} style={{ height: 40 }} alt="" />
                </div> */}
              {title ? (
                <h3 className=" mx-auto fs-3 my-auto py-4">{title}</h3>
              ) : (
                <></>
              )}

              {/* <UserInfoTopbar /> */}
            </div>
            <Container>{children}</Container>
          </Col>
        </Row>
      </Container>
      <AnimatedBg />
      <JoinExamCard />
    </div>
  );
};

export default Layout;
