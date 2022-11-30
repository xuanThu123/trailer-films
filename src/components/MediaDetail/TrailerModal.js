import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import className from "classnames/bind";

import { controlTrailerModal } from "./mediaDetailSlice";
import styles from "./MediaDetail.module.scss";

const cx = className.bind(styles);
function TrailerModal({ trailers }) {
  const dispatch = useDispatch();
  return (
    <div className={cx("trailer-wrapper")}>
      <div className={cx("modal-trailer","video-section")}>
        <div className={cx("inner-modal-trailer")}>
          <div className={cx("title-bar", "d-flex")}>
            <h3 className={cx("title")}>Play Trailer</h3>
            <span onClick={() => dispatch(controlTrailerModal(false))}>
              <CloseOutlined className={cx("close-icon")} />
            </span>
          </div>
          <div className={cx("trailer-content")}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailers?.[0]?.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
