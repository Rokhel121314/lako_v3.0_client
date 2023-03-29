import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import useToggle from "../../hooks/useToggle";
import useClickOutSide from "../../hooks/useClickOutSide";
import useToUpperCase from "../../hooks/useToUpperCase";
import styles from "./navbar.module.css";
import { GrClose, GrMenu } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiUserSettingsFill, RiLogoutBoxRFill } from "react-icons/ri";
import { Link } from "react-scroll";

function Layout() {
  const { persistUserData, handleLogout } = useLogin();
  const { value, toggle, toggleFalseOnly, toggleTrueOnly } = useToggle();
  const { isOpen, toggleIsOpen, ref } = useClickOutSide();
  const [width, setWidth] = useState(window.innerWidth);
  const { toCapitalizedFirstWord } = useToUpperCase();

  function screenWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", screenWidth);
    if (width > 768) {
      toggleFalseOnly();
    } else {
      toggleTrueOnly();
    }
    return () => {
      window.removeEventListener("resize", screenWidth);
    };
    // eslint-disable-next-line
  }, [width]);

  return (
    <>
      {/* navbar for window mode */}
      <nav className={styles["nav-container"]}>
        <div>
          <Link
            className={styles["nav-brand"]}
            activeClass="active"
            to="home"
            smooth={true}
            offset={-70}
            duration={500}>
            <img
              className={styles["nav-logo"]}
              src={require("../../assests/logo/lako icon.png")}
              alt=""
            />
          </Link>
        </div>

        <div className={styles["nav-item"]}>
          <Link
            className={styles["nav-link"]}
            activeClass="active"
            to="home"
            smooth={true}
            offset={-70}
            duration={500}>
            Home
          </Link>
          <Link
            className={styles["nav-link"]}
            activeClass="active"
            to="features"
            smooth={true}
            offset={-30}
            duration={500}>
            Features
          </Link>
          <Link
            className={styles["nav-link"]}
            activeClass="active"
            to="about"
            smooth={true}
            offset={-0}
            duration={500}>
            About
          </Link>
          <Link
            className={styles["nav-link"]}
            activeClass="active"
            to="contact"
            smooth={true}
            offset={-0}
            duration={500}>
            Contact
          </Link>

          {!persistUserData ? (
            <NavLink
              className={`${styles["nav-link"]} ${styles["signin-button"]}`}
              to={"/login"}>
              Sign In
            </NavLink>
          ) : (
            <div
              ref={ref}
              className={`${styles["nav-link"]} ${styles["signin-button"]}`}
              onClick={toggleIsOpen}>
              {toCapitalizedFirstWord(persistUserData.first_name)}
              <IoMdArrowDropdown className={styles["drop-icon"]} />
              {!isOpen ? (
                ""
              ) : (
                <div className={styles["dropdown-menu"]}>
                  <NavLink
                    to={"/lako/pos"}
                    className={`${styles["menu-items"]} ${styles["menu-header"]}`}>
                    <img
                      className={styles["store-icon"]}
                      src={persistUserData.store_logo}
                      alt=""
                    />
                    {persistUserData.store_name}
                  </NavLink>
                  <div className={styles["menu-items"]}>
                    <RiUserSettingsFill className={styles["menu-icon"]} />
                    Account Setting
                  </div>
                  <div
                    className={`${styles["menu-items"]} ${styles["menu-spacer"]}`}></div>
                  <div className={styles["menu-items"]} onClick={handleLogout}>
                    <RiLogoutBoxRFill className={styles["menu-icon"]} />
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* navigation for mobile view */}
      <nav
        className={
          !value
            ? `${styles["sm-navbar-container"]}`
            : `${styles["sm-navbar-container-hidden"]}`
        }>
        <div className={`${styles["smnav-brand"]}`}>
          <Link
            activeClass="active"
            to="home"
            offset={-100}
            smooth={true}
            duration={500}>
            <img
              className={styles["smnav-logo"]}
              src={require("../../assests/logo/lako icon.png")}
              alt=""
            />
          </Link>
          <button className={styles["smnav-xbutton"]} onClick={toggle}>
            {!value ? (
              <GrClose className="close-icon" />
            ) : (
              <GrMenu className="menu-icon" />
            )}
          </button>
        </div>
        <div
          className={
            !value
              ? `${styles["smnav-items"]}`
              : `${styles["smnav-items-hidden"]}`
          }>
          <Link
            className={styles["smnav-link"]}
            activeClass="active"
            to="home"
            offset={-100}
            smooth={true}
            duration={500}
            onClick={toggle}>
            Home
          </Link>
          <Link
            className={styles["smnav-link"]}
            activeClass="active"
            to="features"
            offset={-30}
            smooth={true}
            duration={500}
            onClick={toggle}>
            Features
          </Link>
          <Link
            className={styles["smnav-link"]}
            activeClass="active"
            to="about"
            offset={-15}
            smooth={true}
            duration={500}
            onClick={toggle}>
            About Us
          </Link>
          <Link
            className={styles["smnav-link"]}
            activeClass="active"
            to="contact"
            offset={-15}
            smooth={true}
            duration={500}
            onClick={toggle}>
            Contact Us
          </Link>
        </div>
        <div
          className={
            !value
              ? `${styles["smnav-footer"]}`
              : `${styles["smnav-footer-hidden"]}`
          }>
          <div className={styles["sm-signup-text"]}>Dont have an account?</div>
          <div className={styles["smnav-signup-link"]}>
            Sign up here{" "}
            <NavLink
              className={styles["register-link"]}
              to={"/register"}
              onClick={toggle}>
              REGISTER
            </NavLink>
          </div>
        </div>
      </nav>

      {/* PUBLIC ROUTES */}
      <div id="root">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
