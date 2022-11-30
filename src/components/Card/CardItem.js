import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Progress } from "antd";
import className from "classnames/bind";
import styles from "./CardItem.module.scss";

const cx = className.bind(styles);
function CardItem({ data, width = "100%", bordered, noBRadius, ...props }) {
  const { id, title, backdrop_path, type, vote_average, release_date } = data;
  useEffect(() => {
    document.querySelectorAll(".ant-progress-text").forEach((ele) => {
      ele.removeAttribute("title");
      ele.innerHTML = ` <span style="font-size: 12px">${Number.parseInt(
        ele.textContent
      )}</span><small style="font-size: 8px">%</small>`;
    });
  }, []);

  const formatDate = (timeString) => {
    if (!timeString) return;
    timeString = timeString?.split("-").join(",");
    let d = new Date(timeString);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${mo} ${da}, ${ye}`;
  };

  return (
    <Card
      className={cx({
        bordered: bordered,
      })}
      bordered={false}
      style={{
        width: `${width}`,
        minWidth: `${width}`,
        marginLeft: 20,
        height: `${width * 1.5}`,
        minHeight: `${width * 1.5}`,
      }}
      bodyStyle={{
        padding: "26px 10px 0",
        fontSize: 16,
        position: "relative",
      }}
      cover={
        <Link to={`/${type}/${id}-${title?.trim().replaceAll(" ", "-")}`}>
          <img
            title={title}
            alt="thumbn"
            // src={`https://image.tmdb.org/t/p/w220_and_h330_face${backdrop_path}`}
            src={
              backdrop_path && `https://image.tmdb.org/t/p/w500${backdrop_path}`
            }
            className={cx("thumbn", {
              "no-border-radius": noBRadius,
            })}
          />
        </Link>
      }
      {...props}
    >
      <Progress
        className={cx("vote-average")}
        width={38}
        type="circle"
        percent={vote_average * 10}
        trailColor="#204529"
        strokeColor={vote_average >= 7 ? "#21d07a" : "#d2d531"}
      />
      <Link to={`/${type}/${id}-${title?.trim().replaceAll(" ", "-")}`}>
        <Card.Meta title={title} description={formatDate(release_date)} />
      </Link>
    </Card>
  );
}

export default CardItem;
