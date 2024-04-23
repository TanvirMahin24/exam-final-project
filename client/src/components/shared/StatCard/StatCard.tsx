import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./StatCard.module.css";

interface Props {
  icon: any;
  title: string;
  count: string;
}
const StatCard = ({ icon, title, count }: Props) => {
  return (
    <div className={`mt-3 mt-md-0 ${styles.crd}`}>
      <Row>
        <Col xs={3}>
          <div className={styles.icon}>{icon}</div>
        </Col>
        <Col xs={9}>
          <div className={styles.title}>{title}</div>

          {count ? <div className={styles.count}>{count}</div> : <></>}
        </Col>
      </Row>
    </div>
  );
};

export default StatCard;
