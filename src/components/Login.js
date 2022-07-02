import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    user_email: "",
    user_pass: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.user_email,
        password: credentials.user_pass,
      }),
    });

    const json = await response.json();
    setCredentials({ user_email: "", user_pass: "" });

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert(
        `Logged-in successfully by email - ${credentials.user_email}`,
        "success"
      );
    } else {
      props.showAlert(json.error, "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="text-light">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3 row">
          <label htmlFor="user_email" className="col-sm-2 col-form-label">
            Email :
          </label>
          <div className="col-sm-4">
            <input
              type="email"
              className="form-control"
              id="user_email"
              name="user_email"
              value={credentials.user_email}
              placeholder="john@gmail.com"
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="user_pass" className="col-sm-2 col-form-label">
            Password :
          </label>
          <div className="col-sm-4">
            <input
              type="password"
              className="form-control"
              id="user_pass"
              name="user_pass"
              value={credentials.user_pass}
              onChange={onChange}
              minLength={6}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary col-sm-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
