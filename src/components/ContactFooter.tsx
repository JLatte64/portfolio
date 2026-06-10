import { Link } from "react-router";
import "../components/styles/ContactFooter.css";
import { myinfo } from "../data/myinfo.json";
import "../components/styles/widgets.css";
import "./styles/buttons.css";
import { handleWidgetDisplay, type Widget } from "./Widget";

export function ContactFooter() {
  return (
    <section className="contact-content" id="contact">
      <h2>Contact Me</h2>
      <div className="widgets-container">
        {myinfo.contactMethods.map((contactMethod, contactIndex) => (
          <Link
            to={contactMethod.url}
            className="widget-container"
            aria-label={contactMethod.ariaLabel}
            key={contactIndex}
          >
            {handleWidgetDisplay(contactMethod as Widget)}
          </Link>
        ))}
      </div>
      <form
        target="_blank"
        action={"https://formsubmit.co/"}
        method="POST"
        className="form"
      >
        <div className="form-inputs-container">
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            name="subject"
            className="form-input"
            placeholder="Subject Line"
            required
          />
          <textarea
            placeholder="Your Message"
            className="form-input"
            name="message"
            required
          />
          <button type="submit" className="button form-button">
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
}
