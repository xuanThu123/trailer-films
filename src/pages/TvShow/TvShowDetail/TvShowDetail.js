import React from "react";
import className from "classnames/bind";
import MediaDetail from "~/components/MediaDetail/MediaDetail";

import styles from "./TvShowDetail.module.scss";

const cx = className.bind(styles);
function TvShowDetail() {
  return (
    <div className={cx("wrapper")}>
      <MediaDetail />
    </div>
  );
}

export default TvShowDetail;
