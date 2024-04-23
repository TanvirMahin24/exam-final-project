import { Col, Row } from "react-bootstrap";
import SettingsForm from "../components/dashboard/SettingsForm/SettingsForm";
import Layout from "../components/shared/Layout/Layout";
import PasswordForm from "../components/dashboard/PasswordForm/PasswordForm";

const SettingsPage = () => {
  return (
    <div>
      <Layout>
        <Row>
          <Col md={12}>
            <SettingsForm />
          </Col>
          {/* <Col md={6}>
            <PasswordForm />
          </Col> */}
        </Row>
      </Layout>
    </div>
  );
};

export default SettingsPage;
