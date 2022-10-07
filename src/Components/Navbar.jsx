import React from "react";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [name, setname] = useState("Unknown");
  useEffect(()=>{
    const getUser = async () => {
      if (localStorage.getItem("token")) {
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const json = await response.json();
        setname(json.name);
      }
    };
    getUser();

  });

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/main");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to={`${localStorage.getItem("token") ? "/" : "/main"}`}
          >
            <b>iNotebook</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {localStorage.getItem("token") && (
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <form>
              {localStorage.getItem("token") && (
                <div style={{ marginRight: 50 }}>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-user text-light"></i> Settings
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <p
                          className="my-1"
                        >
                          <i className="fa-regular fa-user text-light"></i> {name}
                        </p>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="btn btn-primary my-1 mx-4"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
