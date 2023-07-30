import React, { useState } from "react";
import axiosWithAuth from "./axiosWithAuth";
import { useHistory } from "react-router-dom";

export default function LogIn(props) {
  const history = useHistory();
  const { setAuth } = props;
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axiosWithAuth
      .post("auth/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setAuth(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main-page">
      <h3>Login Page</h3>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}
