import React, { useState, useEffect } from "react";
import Section from "./Section";
import Footer from "./Footer";
import vehicleLogo from "../images/vehicleLogo.jpg";
import payment from "../images/payment.jpg";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import "../App.css";

function UserHome(props) {
  const location = useLocation();
  const history = useHistory();
  const user = location.state;
  const [isHome, setIsHome] = useState(false);
  const goToHome = (event) => {
    setIsHome(true);
  };
  const bookRide = (event) => {
    history.push({
      pathname: "/BookRide",
      state: {
        userName: location.state.userName,
        password: location.state.password,
      },
    });
  };
  useEffect(() => {
    console.log("setIsHome:", setIsHome);
    if (isHome) {
      history.push({
        pathname: "/",
        state: {
          userName: location.state.userName,
          password: location.state.password,
        },
      });
    }
  }, [isHome]);
  return (
    <div className="header">
      <div className="container_login">
        <nav className="nav_checkbox">
          <a href="#" className="logo">
            RIDESHARE
          </a>
          <input type="checkbox" id="tab-nav" className="tab-nav" />
          <label for="tab-nav" className="label">
            <div class="bgr"></div>
            <div class="bgr"></div>
            <div class="bgr"></div>
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
        <div>{user.state.userName} Logged In successfully!!</div>
      </div>
      <div className="content_section">
        <div className="cardContainer">
          <div className="rideItems">
            <button
              id="bookRide"
              type="submit"
              onClick={(e) => {
                bookRide(e);
              }}
            >
              Book a ride
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserHome;
