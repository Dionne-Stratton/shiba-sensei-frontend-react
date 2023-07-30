// import React, { useState } from "react";
import React from "react";

const Contact = () => {
  // const initialFormState = {
  //   user_name: "",
  //   email: "",
  //   subject: "",
  //   message: "",
  // };
  // const [form, setForm] = useState(initialFormState);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your form submission logic here (e.g., send data to a server)
  //   console.log("Form submitted:", form);
  //   // Reset the form after submission
  //   setForm(initialFormState);
  // };

  return (
    <div className="main-page">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you!</p>
      {/* <p>
        If you have any questions, feedback, or inquiries, please fill out the
        form below.
      </p> */}
      <p>
        If you have any questions, feedback, or inquiries, please drop us a line
        at dionnestratton@gmail.com.
      </p>
      <p> We'll get back to you as soon as possible.</p>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">User Name: </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={form.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject: </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message: </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default Contact;
