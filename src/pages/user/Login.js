import React, { useEffect } from "react";
import styles from "./user.module.css";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const { handleChange, loginData, persistUserData, resetPasswordInput } =
    useLogin();
  const dispatch = useDispatch();
  const { userData, isLoading } = useSelector((state) => state.user);
  const isBolean = typeof userData == "boolean";

  useEffect(() => {
    if (persistUserData) {
      navigate("/");
    } else if (!persistUserData) {
      return;
    }
  }, [persistUserData, navigate]);

  const handleLogin = () => {
    dispatch(userLogin(loginData));
    resetPasswordInput();
  };

  return (
    <div className={styles["login-container"]}>
      {/* CONTENT */}
      <div className={styles["login-content"]}>
        <Link to={"/"} className={styles["login-content-header"]}>
          <img src={require("../../assests/logo/logo.png")} alt="logo" />
        </Link>
        <div className={styles["login-content-section"]}>
          <div className={styles["login-slogan"]}>
            We make your business easy!{" "}
          </div>
          <div className={styles["login-subtext"]}>
            Effortlessly manage inventory, POS and sales with LAKO. Optimize
          </div>
          <div className={styles["login-subtext"]}>
            stock levels, increase profits.
          </div>
        </div>
      </div>

      {/* LOG IN INTERFACE/FORM */}
      <div className={styles["login-form"]}>
        <div className={styles["form-container"]}>
          <div className={styles["test-account-container"]}>
            TEST ACCOUNT:
            <br />
            Puring Store
            <br /> email: jerick@gmail.com pass: jerick
            <br />
            Bitter-Sweet-Cafe
            <br /> email: rokhel@gmail.com pass: rokhel
          </div>
          <div className={styles["form-header"]}>Sign in to LAKO</div>

          {/* FORM */}
          <form
            className={styles["form-subcontainer"]}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}>
            {/* USERNAME INPUT */}
            <div className={styles["form-inputcontainer"]}>
              <input
                className={styles["form-inputfield"]}
                type="text"
                name="user_name"
                value={loginData.user_name}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className={styles["form-inputcontainer"]}>
              <input
                className={styles["form-inputfield"]}
                type="password"
                name="user_password"
                value={loginData.user_password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>

            {/* INPUT NOTICES */}
            <div
              className={
                !isBolean
                  ? styles["login-status-success"]
                  : styles["login-status-fail"]
              }>
              {isBolean
                ? userData
                  ? "INCORRECT PASSWORD"
                  : "USER DOES NOT EXIST"
                : !persistUserData
                ? ""
                : "LOGGED IN SUCCESSFULLY"}
            </div>
            <div className={styles["form-inputcontainer"]}>
              <button type="submit" className={styles["form-button"]}>
                SIGN IN
              </button>
            </div>
          </form>
          <div className={styles["form-footer"]}>
            Don't have an account?{" "}
            <Link className={styles["form-link"]} to={"/register"}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
      {!isLoading ? (
        ""
      ) : (
        <div className={styles["loader"]}>
          <img src={require("../../assests/logo/loader.gif")} alt="" />
        </div>
      )}
    </div>
  );
}

export default Login;
