import React, { useState } from "react";
import axios from "axios";

export default function Register(props) {
  const initialFormState = {
    email: "",
    password: "",
    user_name: "",
    user_level: 1,
    user_vocab: [],
  };

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/auth/register", form)
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
    <div className="main-page">
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
        <label htmlFor="user_name">Username</label>
        <input
          type="text"
          name="user_name"
          value={form.user_name}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
}
