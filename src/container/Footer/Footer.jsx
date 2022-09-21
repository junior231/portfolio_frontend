import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setLoading(false);
    setIsFormSubmitted(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
        setShow(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 className="head-text">Have coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:ilocollinsdev231@gmail.com" className="p-text">
            ilocollinsdev231@gmail
          </a>
        </div>

        <div className="app__footer-card">
          <img src={images.resume} alt="resume icon" />
          <a
            target="_blank"
            rel="noreferrer"
            href="https://drive.google.com/file/d/1AmMp9jWwyjM7m4_qWELs5BhKu24w9K7U/view?usp=sharing"
            className="p-text"
          >
            View Resume
          </a>
        </div>
      </div>
      {isFormSubmitted && (
        <div className="app__flex">
          <Alert
            show={show}
            onClose={() => setShow(false)}
            dismissible
            variant="success"
          >
            <Alert.Heading>Message Sent</Alert.Heading>
            <p>Thank you for getting in touch</p>
          </Alert>
        </div>
      )}
      <form className="app__footer-form app__flex" onSubmit={handleSubmit}>
        <div className="app__flex">
          <input
            className="p-text"
            type="text"
            required
            placeholder="Your Name"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="app__flex">
          <input
            className="p-text"
            type="email"
            required
            placeholder="Your Email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <textarea
            className="p-text"
            required
            placeholder="Your Message"
            value={message}
            name="message"
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit" className="p-text">
          {!loading ? "Send Message" : "Sending..."}
        </button>
      </form>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);
