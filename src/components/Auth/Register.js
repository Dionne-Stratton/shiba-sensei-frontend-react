import React, { useState, useEffect } from "react";
import axiosWithAuth from "./axiosWithAuth";
import { useHistory } from "react-router-dom";

export default function Register(props) {
  const { setAuth, lesson1 } = props;
  const history = useHistory();

  const initialFormState = {
    email: "",
    password: "",
    user_name: "",
    user_vocab: [],
    available_lesson: 1,
    user_lessons: [],
  };

  useEffect(() => {
    if (lesson1.length > 0) {
      let lessonsID = lesson1.map((word) => word._id);
      setForm({ ...form, user_lessons: lessonsID });
    } //eslint-disable-next-line
  }, [lesson1]);

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axiosWithAuth
      .post("auth/register", form)
      .then((res) => {
        console.log(res);
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
