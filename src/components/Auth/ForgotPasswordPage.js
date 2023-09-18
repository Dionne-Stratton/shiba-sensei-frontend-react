import React, { useState, useEffect } from "react";
import axiosWithAuth from "./axiosWithAuth";
import * as yup from "yup";

export default function ForgotPasswordPage() {
  let useURL = "email";

  const resetFormState = {
    email: "",
  };

  const [form, setForm] = useState(resetFormState);

  const [errors, setErrors] = useState({
    email: "",
  });

  const [ableToSubmit, setAbleToSubmit] = useState(false);

  const formSchema = yup.object().shape({
    email: yup.string().email("must be a valid email address"),
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
    axiosWithAuth
      .post(useURL, form)
      .then((res) => {
        console.log(res);
        alert("Email Sent");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="main-page">
      <h3>Reset Password</h3>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email ? <span>{errors.email}</span> : null}
        <button type="button" onClick={handleSubmit} disabled={!ableToSubmit}>
          Reset Password
        </button>
      </form>
    </div>
  );
}
