import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import "../App.css";
import { NavLink, useLocation, useHistory } from "react-router-dom";

const Register = () => {
  const [isHome, setIsHome] = useState(false);
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const errors = {
    uname: "INVALID USERNAME/PASSWORD",
    pass: "INVALID USERNAME/PASSWORD",
  };
  const [drop, setDrop] = useState("");

  const options = [
    {
      label: "Employee",
      value: "Employee",
    },
    {
      label: "Customer",
      value: "Customer",
    },
  ];
  const goToHome = (event) => {
    setIsHome(true);
  };
  const name = userName;

  const blog = { name, password };
  const handleSubmit = (event) => {
    fetch("http://localhost:9002/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data to enter", data);
      });
    setIsHome(true);
    let emailValid = userName.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
    if (!password || password.length < 6) {
      // Invalid password
      setErrorMessages({ name: "pass", message: errors.pass });
    } else if (!userName || !emailValid) {
      setErrorMessages({ name: "uname", message: errors.uname });
    } else {
      setIsSubmitted(true);
    }
  };
  useEffect(() => {
    if (isHome && isSubmitted) {
      history.push("/", {
        replace: true,
        state: { userName: userName, registeredFlag: "registerFlag" },
      });
    }
  }, [isSubmitted]);
  const renderErrorMessage = (name) => {
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  };

  return (
    <div className="header">
      <div className="container_login">
        <nav className="nav_checkbox">
          <a href="#" className="logo">
            RIDESHARE
          </a>
          <input type="checkbox" id="tab-nav" className="tab-nav" />
          <label for="tab-nav" className="label">
            <div class="burger"></div>
            <div class="burger"></div>
            <div class="burger"></div>
          </label>
          <ul className="content_nav">
            <li>
              <NavLink to="/" onClick={() => goToHome()}>
                HOME
              </NavLink>
            </li>
            <li>
              <a href="#">ABOUT</a>
            </li>
            <li>
              <a href="#">BLOG</a>
            </li>
            <li>
              <a href="#">SERVICE</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="content_section">
        <div>
          <div className="input-container">
            <label class="lbl">Username </label>
            <input
              type="text"
              name="uname"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label class="lbl">Password </label>
            <input
              type="password"
              name="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {renderErrorMessage("pass")}
          </div>
          <div className="input-container">
            <label class="lbl">User Type </label>
            <select
              type="text"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
            >
              <option value="">--Choose--</option>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="button-container">
            <button
              id="register1"
              class="btn"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              <h2>Register</h2>
            </button>
          </div>
          <div className="errMsg">
            {!isSubmitted ? <div>{errorMessages.message}</div> : ""}
          </div>
        </div>
      </div>
      <div className="contentfooter">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
