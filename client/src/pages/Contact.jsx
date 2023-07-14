import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <Layout className="register-form">
      <div className="main-content">
        <div className="side-content">
          <div className="upper-part">
            <h3>Got Questions or issues ? </h3>
            <h5>
              Don't worry we are here for your help 24*7
              <h6>send us a message or coneect with us via social media</h6>
            </h5>
          </div>
          <div className="lower-part">
            Email Us at : ShopWay@gmail.com <br />
            Connect With Us : <br />
          </div>
        </div>
        <div className="register">
          <h1 className="register-head navbar-brand">Contact Us</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email "
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Message
              </label>
              <br />
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
                spellCheck
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Your Message Here"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
