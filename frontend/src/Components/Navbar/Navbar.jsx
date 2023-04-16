import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pages } from "../../data";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  const [name, setName] = useState("Username");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setName(JSON.parse(localStorage.getItem("user"))["fname"]);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [localStorage.getItem("user")]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    pages.forEach((page, index) => {
      if (page.path == window.location.pathname) {
        setActive(index);
      }
    });
  }, [active]);

  const NavLink = ({
    name,
    path,
    index = "navLink",
    classname = "navLink",
  }) => (
    <Link
      className={active === index ? `${classname}Active` : classname}
      to={path}
      onClick={() => {
        setActive(index);
      }}
    >
      {name}
    </Link>
  );

  return (
    <nav className="Navbar">
      <div className="logo">
        <h1>Travel Planner</h1>
      </div>
      {loggedIn ? (
        <ul>
          <li>
            <NavLink name={"Home"} path={"/"} />
          </li>
          <li>
            <NavLink name={name} path={"/dashboard"} />
          </li>
          <li
            onClick={() => {
              console.log("hi");
              fetch("http://localhost:8000/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: JSON.parse(localStorage.getItem("user"))["email"],
                }),
              })
                .then((res) => res.json())
                .then((res) => {
                  localStorage.clear();
                  navigate("/auth");
                  window.location.reload();
                });
            }}
          >
            <span class="material-symbols-outlined" title="logout">
              logout
            </span>
          </li>
        </ul>
      ) : (
        <ul className="navLinks">
          <ul>
            <li>
              <NavLink name={"Home"} path={"/"} />
            </li>
            <li>
              <NavLink name={"Login/Signup"} path={"/auth"} />
            </li>
          </ul>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
