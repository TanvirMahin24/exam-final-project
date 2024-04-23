import { Card, Col, Container, Row } from "react-bootstrap";
import quoteImg from "../../../assets/CustomerReview/quote.svg";
import data from "./stub/fakeData";
import styles from "./CustomerReview.module.css";

const CustomerReview = () => {
  return (
    <div className={styles.customer_review}>
      <Container className="py-5">
        <Row className="pb-5">
          <Col md={6} xs={12}>
            <img src={quoteImg} alt="Quote" />
            <span className={`d-block heading__2 px-md-5 px-0 ${styles.title}`}>
              Real Stories from Real Students
            </span>
            <div>
              <Card className={`p-5 ml-md-auto ${styles.card__left}`}>
                <img
                  src={quoteImg}
                  alt="Quote"
                  className={styles.left__card__img}
                />
                <span className={`lead__1 text-justify ${styles.review__left}`}>
                  {data[0].review}
                </span>
                <span className="d-block subtitle__1 pt-2">{data[0].user}</span>
                <span className={`d-block lead__2 ${styles.left__card__role}`}>
                  {data[0].role}
                </span>
              </Card>
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className={styles.right__cards}>
              <Card
                className={`p-5 mx-auto ${styles.card__left}`}
                data-aos="fade-down"
                data-aos-easing="linear"
              >
                <img
                  src={quoteImg}
                  alt="Quote"
                  className={styles.left__card__img}
                />
                <span className={`lead__1 text-justify ${styles.review__left}`}>
                  {data[1].review}
                </span>
                <span className="d-block subtitle__1 pt-2">{data[1].user}</span>
                <span className={`d-block lead__2 ${styles.left__card__role}`}>
                  {data[1].role}
                </span>
              </Card>

              <Card className={`p-5 mx-auto ${styles.card__left} mt-5`}>
                <img
                  src={quoteImg}
                  alt="Quote"
                  className={styles.left__card__img}
                />
                <span className={`lead__1 text-justify ${styles.review__left}`}>
                  {data[2].review}
                </span>
                <span className="d-block subtitle__1 pt-2">{data[2].user}</span>
                <span className={`d-block lead__2 ${styles.left__card__role}`}>
                  {data[2].role}
                </span>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerReview;
