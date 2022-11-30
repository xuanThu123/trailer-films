import React from "react";
import className from "classnames/bind";
import styles from "./Pagination.module.scss";

const cx = className.bind(styles);
function Pagination({ onClick }) {
  return (
    <div className={cx("wrapper", "d-flex")}>
      <p onClick={onClick} className={cx("load-more")}>
        Load More
      </p>
    </div>
  );
}

export default Pagination;
