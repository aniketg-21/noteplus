import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/new_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    setCredentials({
      name: "",
      email: "",
      password: "",
      cpassword: "",
    });

    if (json.success) {
      navigate("/login");
      props.showAlert(
        `Account created successfully by email - ${credentials.email}`,
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
      <h2>Create an account on Noteplus</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name :
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              placeholder="John Watson"
              onChange={onChange}
              minLength={2}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="r_email" className="col-sm-2 col-form-label">
            Email :
          </label>
          <div className="col-sm-4">
            <input
              type="email"
              className="form-control"
              id="r_email"
              name="email"
              value={credentials.email}
              placeholder="john@gmail.com"
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="r_password" className="col-sm-2 col-form-label">
            Password :
          </label>
          <div className="col-sm-4">
            <input
              type="password"
              className="form-control"
              id="r_password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              minLength={6}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="r_cpassword" className="col-sm-2 col-form-label">
            Confirm Password :
          </label>
          <div className="col-sm-4">
            <input
              type="password"
              className="form-control"
              id="r_cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              minLength={6}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary col-sm-2">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Register;
