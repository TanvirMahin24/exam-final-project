import { Card, Col, Container, Row } from "react-bootstrap";
import LoginForm from "./LoginForm/LoginForm";
import styles from "./Login.module.css";
import RegForm from "./RegForm/RegForm";
import DarkSidebar from "../../shared/DarkSidebar/DarkSidebar";

interface Props {
  reg?: boolean;
}

const Login = ({ reg = false }: Props) => {
  return (
    <div className={styles.login}>
      <Container className={`p-5 ${styles.left}`}>
        <span className="d-block heading__2 py-4">
          {reg ? "Register" : "Login"}
        </span>
        <Row>
          <Col className="">
            <Card className={styles.login__card}>
              <Card.Body>{reg ? <RegForm /> : <LoginForm />}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <DarkSidebar />
    </div>
  );
};

export default Login;
