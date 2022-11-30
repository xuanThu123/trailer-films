import React from "react";
import className from "classnames/bind";
import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import styles from "./DefaultLayout.module.scss";

const cx = className.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <header className={cx("d-flex", "p-fixed")}>{<Header />}</header>
      <main>{children}</main>
      <footer>{<Footer />}</footer>
    </div>
  );
}

export default DefaultLayout;
