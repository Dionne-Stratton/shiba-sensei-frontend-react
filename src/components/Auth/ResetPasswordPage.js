import React, { useState, useEffect } from "react";
import axiosWithAuth from "./axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

export default function ResetPasswordPage(props) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const token = useParams();

  const initialFormState = {
    email: "",
    password: "",
    pin: "",
  };

  const [form, setForm] = useState(initialFormState);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    pin: "",
  });

  const [ableToSubmit, setAbleToSubmit] = useState(false);

  const formSchema = yup.object().shape({
    email: yup.string().email("must be a valid email address"),
    password: yup.string().min(6, "must be at least 6 characters"),
    pin: yup.string().min(4, "must be at least 4 characters"),
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
    localStorage.setItem("token", token);
    formSchema.isValid(form).then((isFormValid) => {
      setAbleToSubmit(isFormValid);
    });
    setErrorMessage("");
    //eslint-disable-next-line
  }, [form]);

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
    axiosWithAuth
      .put("auth/password-reset", form)
      .then((res) => {
        console.log(res);
        alert("Password Reset");
        history.push("/auth/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className="main-page">
      <h3>Reset Password Page</h3>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email ? <span>{errors.email}</span> : null}
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password ? <span>{errors.password}</span> : null}
        <label htmlFor="pin">Pin</label>
        <input type="pin" name="pin" value={form.pin} onChange={handleChange} />
        {errors.pin ? <span>{errors.pin}</span> : null}
        <button type="button" onClick={handleSubmit} disabled={!ableToSubmit}>
          Submit
        </button>
        {errorMessage ? <span>{errorMessage}</span> : null}
      </form>
    </div>
  );
}
