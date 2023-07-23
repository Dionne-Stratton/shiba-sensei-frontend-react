import React, { useState } from "react";
import axios from "axios";
import { testURL } from "../../BaseURLs";

export default function Register(props) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post(`${testURL}/auth/register`, form)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>Register Page</h3>
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
          Register
        </button>
      </form>
    </div>
  );
}
