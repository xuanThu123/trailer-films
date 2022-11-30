import React from "react";
import className from "classnames/bind";
import MediaDetail from "~/components/MediaDetail/MediaDetail";

import styles from "./MovieDetail.module.scss";

const cx = className.bind(styles);
function MovieDetail() {
  return (
    <div className={cx("wrapper")}>
      <section>
        <MediaDetail />
      </section>
    </div>
  );
}

export default MovieDetail;
