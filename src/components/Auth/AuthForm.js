import React, { useState, useEffect } from "react";
import axiosWithAuth from "./axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

export default function AuthForm(props) {
  const { setAuth, lesson1 } = props;
  const history = useHistory();
  const { auth } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  let useURL = "";
  if (auth === "register") {
    useURL = "auth/register";
  } else if (auth === "login") {
    useURL = "auth/login";
  }

  const registerFormState = {
    email: "",
    password: "",
    user_vocab: [],
    available_lesson: 1,
    user_lessons: [],
  };

  const loginFormState = {
    email: "",
    password: "",
  };

  const initialFormState =
    auth === "register" ? registerFormState : loginFormState;
  const [form, setForm] = useState(initialFormState);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [ableToSubmit, setAbleToSubmit] = useState(false);

  const formSchema = yup.object().shape({
    email: yup.string().email("must be a valid email address"),
    password: yup.string().min(6, "must be at least 6 characters"),
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [e.target.name]: error.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(form).then((isFormValid) => {
      setAbleToSubmit(isFormValid);
    });
    setErrorMessage("");
    //eslint-disable-next-line
  }, [form, auth]);

  const handleChange = (e) => {
    e.persist();
    validateChange(e);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setErrorMessage("");
    if (auth === "register") {
      let lessonsID = lesson1.map((word) => word._id);
      form.user_lessons = lessonsID;
    }
    axiosWithAuth
      .post(useURL, form)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setAuth(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className="main-page">
      {auth === "register" ? <h3>Register Page</h3> : <h3>Login Page</h3>}
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email ? <span>{errors.email}</span> : null}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password ? <span>{errors.password}</span> : null}
        <button type="button" onClick={handleSubmit} disabled={!ableToSubmit}>
          {auth === "register" ? "Register" : "Login"}
        </button>
        {errorMessage ? <span>{errorMessage}</span> : null}
      </form>
    </div>
  );
}
