import { Container, Row } from "react-bootstrap";
import FeatureItem from "./FeatureItem/FeatureItem";
import styles from "./Features.module.css";
import data from "./stub/fakeData";

const Features = () => {
  return (
    <div className={styles.features} data-aos="fade-top">
      <Container>
        <span className="d-block heading__2 text-center">Our Features</span>
        <span className="d-block lead__1 text-center">
          We love making your life easy by providing useful and effective
          features
        </span>
        <Row className="py-5">
          {data.map((feature) => (
            <FeatureItem {...feature} key={feature.id} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Features;
