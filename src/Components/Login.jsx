import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [passVisibility, setPassVisibility] = useState(false);
  let Navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      props.showAlert("Logged In, Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials, please try again.", "warning");
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
  return (
    <div>
      <h2 className="mt-2">Login Your account</h2>
      <form onSubmit={HandleSubmit}>
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
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword">Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="exampleInputPassword"
            autoComplete="off"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onchange}
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
        <Link to={"/signup"} className="my-2">
          Want to create a new account?
        </Link>

        <button
          disabled={credentials.password.length <= 5}
          style={{ display: "block" }}
          type="submit"
          className="btn btn-primary my-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
