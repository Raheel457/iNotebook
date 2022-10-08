import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Singup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passVisibility, setPassVisibility] = useState(false);
  const [conPassVisibility, setConPassVisibility] = useState(false);
  let Navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // Checking if login credentials are matched
    if (json.status) {
      localStorage.setItem("token", json.jwtData);
      setTimeout(() => {
        localStorage.removeItem("token");
      }, 600000);
      Navigate("/");
      props.showAlert("Account created, Successfully", "success");
    } else {
      props.showAlert("User already exists.", "warning");
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // To toggle password view from hidden to text
  const showPass = () => {
    setPassVisibility((prev) => {
      return !prev;
    });
    var x = document.getElementById("exampleInputPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const showConPass = () => {
    setConPassVisibility((prev) => {
      return !prev;
    });
    var x = document.getElementById("exampleInputConfirmPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <div>
      <h2 className="mt-2">Sign up with us</h2>
      <form onSubmit={HandleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            className="form-control my-2"
            id="exampleInputName"
            aria-describedby="text"
            placeholder="Enter your Name"
            name="name"
            value={credentials.name}
            onChange={onchange}
            minLength={3}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control my-2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={onchange}
            required
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword">Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="exampleInputPassword"
            placeholder="Password"
            autoComplete="off"
            name="password"
            value={credentials.password}
            onChange={onchange}
            minLength={5}
            required
          />
          {credentials.password && (
            <span
              className="d-inline-block"
              style={{ position: "relative", bottom: 40, left: "95%" }}
              tabIndex="0"
              data-bs-toggle="tooltip"
              title={`${passVisibility ? "Hide Password" : "Show Password"}`}
            >
              <i
                className={`far fa-${passVisibility ? "eye-slash" : "eye"}`}
                onClick={showPass}
                id="togglePassword"
              ></i>
            </span>
          )}
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputConfirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="exampleInputConfirmPassword"
            placeholder="Confirm Password"
            autoComplete="off"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={onchange}
            minLength={5}
            required
          />
          {credentials.confirmPassword && (
            <span
              className="d-inline-block"
              style={{ position: "relative", bottom: 40, left: "95%" }}
              tabIndex="0"
              data-bs-toggle="tooltip"
              title={`${passVisibility ? "Hide Password" : "Show Password"}`}
            >
              <i
                className={`far fa-${conPassVisibility ? "eye-slash" : "eye"}`}
                onClick={showConPass}
                id="togglePassword"
              ></i>
            </span>
          )}
        </div>
        <Link to={"/login"} className="my-2">
          Do you already have an account?
        </Link>

        <button
          style={{ display: "block" }}
          disabled={
            credentials.password !== credentials.confirmPassword ||
            credentials.password === ""
          }
          type="submit"
          className="btn btn-primary my-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
