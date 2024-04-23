import styles from "./Pagination.module.css";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  total: number;
  current: number;
  url: string;
  onClick?: (newPage: number) => void;
}

const Pagination = ({ total, url, current, onClick }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clickHandeler = (page: number) => {
    if (page < 1) {
      page = 1;
      return;
    }
    if (page > total) {
      page = total;
      return;
    }
    let queryString = `${searchParams.toString()}`.replace(
      `page=${current}`,
      ""
    );
    if (queryString.startsWith("&")) {
      queryString = queryString.slice(1);
    }
    if (onClick) {
      onClick(page);
    }
    navigate(`${url}?page=${page}`);
  };
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.icon} ${current !== 1 ? styles.active : ""}`}
        onClick={() => clickHandeler(current !== 1 ? current - 1 : 1)}
      >
        <IconArrowLeft />
      </div>
      <div className={styles.text}>
        <span>Page </span>
        <span>
          {current} of {total}
        </span>
      </div>
      <div
        className={`${styles.icon} ${current !== total ? styles.active : ""}`}
        onClick={() => clickHandeler(current !== total ? current + 1 : total)}
      >
        <IconArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
