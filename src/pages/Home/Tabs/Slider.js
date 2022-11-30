import React, { useEffect, useRef } from "react";
import { Tabs } from "antd";
import className from "classnames/bind";
import CardItem from "~/components/Card/CardItem";
import styles from "./Slider.module.scss";

const cx = className.bind(styles);

function Slider({ name, tabs }) {
  const progressRef = useRef();

  const handleTabChange = () => {
    progressRef.current.style.backgroundColor = "rgba(1, 180, 228, 1)";
    progressRef.current.style.width = 100 + "%";
  };

  useEffect(() => {
    const contentHolderElm = document.querySelectorAll(
      ".ant-tabs-content-holder"
    );

    const tabContent = document.querySelectorAll(".ant-tabs-content");

    tabContent.forEach((elm, index) => {
      elm.addEventListener("scroll", () => {
        if (elm.scrollLeft > 0) {
          contentHolderElm[index].classList.add("is-hidden");
        } else {
          contentHolderElm[index].classList.remove("is-hidden");
          contentHolderElm[index].classList.add("is-visible");
        }
      });
    });
  }, []);

  useEffect(() => {
    const _progressRef = progressRef.current;
    const unsubscribe = () => {
      _progressRef.style.backgroundColor = "transparent";
      _progressRef.style.width = 0 + "%";
    };
    _progressRef.addEventListener("transitionend", unsubscribe);

    return () => {
      _progressRef.removeEventListener("transitionend", unsubscribe);
    };
  }, []);
  return (
    <div className={cx("wrapper", "d-flex")}>
      <div className={cx("colum")}>
        <h2 className={cx("title")}>{name}</h2>
        <Tabs defaultActiveKey={tabs[0]} onChange={handleTabChange}>
          {tabs &&
            !!tabs.length &&
            tabs.map((tab) => (
              <Tabs.TabPane tab={tab.tab} key={tab.key}>
                <div className={cx("slider-content")}>
                  {tab?.data?.map((data) => (
                    <CardItem key={data.id} data={data} width="150px" />
                  ))}
                </div>
              </Tabs.TabPane>
            ))}
        </Tabs>
        <div className={cx("progress-bar")}>
          <div ref={progressRef} className={cx("perValue")}></div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
