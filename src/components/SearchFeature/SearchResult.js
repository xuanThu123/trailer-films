import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import className from "classnames/bind";
import { FilmIcon, TvShowIcon } from "~/components/Icons";
import styles from "./SearchFeature.module.scss";

const cx = className.bind(styles);
function SearchResult({ result }) {
  const { id, title, media_type, name } = result;
  return (
    <Link
      to={`/${media_type ? media_type : title ? "movie" : "tv"}/${id}`}
      className={cx("result-item", "d-flex")}
    >
      {media_type === "movie" ? (
        <FilmIcon className={cx("search-icon")} />
      ) : media_type === "tv" ? (
        <TvShowIcon className={cx("search-icon")} />
      ) : (
        <SearchOutlined className={cx("search-icon")} />
      )}
      <p>{title || name}</p>
    </Link>
  );
}

export default SearchResult;
