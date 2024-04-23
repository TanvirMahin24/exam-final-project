import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavLogo from "./NavLogo/NavLogo";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";

interface Props {
  exam?: boolean;
}
const Navbar = ({ exam }: Props) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth && !exam) {
      navigate("/dashboard");
    }
  }, [isAuth]);
  return (
    <div className={styles.wrapper}>
      <Container>
        <BootstrapNavbar
          bg="none"
          collapseOnSelect
          expand="md"
          variant="light"
          className={`${styles.navbar}`}
        >
          <BootstrapNavbar.Brand href="#home">
            <NavLogo />
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
          <BootstrapNavbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {isAuth ? (
                <>
                  <Nav.Link as={Link} to="/" className={styles.nav__link}>
                    Dashboard
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/" className={styles.nav__link}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" className={styles.nav__link}>
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/register"
                    className={styles.nav__link}
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
      </Container>
    </div>
  );
};

export default Navbar;
