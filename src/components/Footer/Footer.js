import React from "react";
import { Link } from "react-router-dom";
import className from "classnames/bind";
import { FooterLogo } from "~/components/Icons";
import styles from "./Footer.module.scss";

const cx = className.bind(styles);

const FooterSection = ({ value }) => (
  <div className={cx("footer-section")}>
    <h3 className={cx("title")}>{value.title}</h3>
    <ul>
      {value.items?.map((item, index) => (
        <li key={index}>
          <Link to={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const footerContent = [
  {
    title: "THE BASICS",
    items: [
      {
        name: "About TMDB",
        path: "/",
      },
      {
        name: "Contact Us",
        path: "/",
      },
      {
        name: "Support Forums",
        path: "/",
      },
      {
        name: "API",
        path: "/",
      },
      {
        name: "System Status",
        path: "/",
      },
    ],
  },
  {
    title: "GET INVOLVED",
    items: [
      {
        name: "Contribution Bible",
        path: "/",
      },
      {
        name: "Add New Movie",
        path: "/",
      },
      {
        name: "Add New TV Show",
        path: "/",
      },
    ],
  },
  {
    title: "COMMUNITY",
    items: [
      {
        name: "Guidelines",
        path: "/",
      },
      {
        name: "Discussions",
        path: "/",
      },
      {
        name: "Leaderboard",
        path: "/",
      },
      {
        name: "Twitter",
        path: "/",
      },
    ],
  },
  {
    title: "LEGAL",
    items: [
      {
        name: "Terms of Use",
        path: "/",
      },
      {
        name: "API Terms of Use",
        path: "/",
      },
      {
        name: "Privacy Policy",
        path: "/",
      },
    ],
  },
];

function Footer() {
  return (
    <div className={cx("wrapper", "d-flex")}>
      <nav className={cx("nav-footer", "d-flex")}>
        <div className={cx("footer-logo")}>
          <FooterLogo />
          <Link to="/">Join the Community</Link>
        </div>
        {footerContent.map((footcontent, index) => (
          <FooterSection key={index} value={footcontent} />
        ))}
      </nav>
    </div>
  );
}

export default Footer;
