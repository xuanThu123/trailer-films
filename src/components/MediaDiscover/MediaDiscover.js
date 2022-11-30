import React, { useMemo, useState, useEffect } from "react";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import className from "classnames/bind";
import CardItem from "~/components/Card/CardItem";
import Pagination from "~/components/Pagination/Pagination";
import { formatData } from "~/app/services/services";
import { controlSearchBox } from "~/components/SearchFeature/searchSlice";
import styles from "./MediaDiscover.module.scss";

const cx = className.bind(styles);
function MediaDiscover({ api, title }) {
  const dispatch = useDispatch();
  const [dataMedia, setDataMedia] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [isShowLoadMoreBtn, setIsShowLoadMoreBtn] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(controlSearchBox(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDataMedia(loadMore);
    setLoadMore(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        Math.floor(
          ((document.documentElement.scrollTop || document.body.scrollTop) /
            (document.documentElement.scrollHeight -
              document.documentElement.clientHeight)) *
            100
        ) === 80 &&
        !isShowLoadMoreBtn
      ) {
        console.log("infinite scroll");
        setCurrentPage(currentPage + 1);
        setLoadMore(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.addEventListener("scroll", handleScroll);
  }, [loadMore, currentPage, isShowLoadMoreBtn]);

  const params = useMemo(
    () => ({
      api_key: process.env.REACT_APP_API_KEY,
      language: "en-US",
      page: currentPage,
    }),
    [currentPage]
  );

  const handleLoadMoreClick = () => {
    console.log("load more...");
    setIsShowLoadMoreBtn(false);
    setLoadMore(true);
    setCurrentPage((prev) => prev + 1);
  };

  const getDataMedia = async (load) => {
    if (load) {
      const response = await api(params);
      const data = formatData(response.results);
      setDataMedia((prev) => [...prev, ...data]);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h2>{title}</h2>
      </div>
      <div className={cx("content")}>
        <Row
          gutter={[{ xs: 15, sm: 15, md: 20, lg: 25 }, 30]}
          justify="space-between"
        >
          {dataMedia?.map((item, i) => (
            <Col key={i} xs={24} sm={12} md={8} lg={6} xl={4}>
              <CardItem data={item} bordered noBRadius />
            </Col>
          ))}
        </Row>
        <Row>
          {isShowLoadMoreBtn && <Pagination onClick={handleLoadMoreClick} />}
        </Row>
      </div>
    </div>
  );
}

export default MediaDiscover;
