import { Link } from "react-router";
import "../components/styles/contactFooter.css";
import { myinfo } from "../data/myinfo.json";
import "./styles/buttons.css";
import { handleIconDisplay } from "./functions/HandleIconDisplay";
import type { IconData } from "./types/IconTypes";

export function ContactFooter() {
  return (
    <section className="contact-content" id="contact">
      <h2>Contact Me</h2>
      <p>Send me a message!</p>
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
            placeholder="Your Name"
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
            placeholder="Message Text"
            className="form-input"
            name="message"
            required
          />
          <button type="submit" className="form-button button">
            Send Message
          </button>
        </div>
      </form>
      <p>Or find me at:</p>
      <div className="contact-widgets-container">
        {myinfo.contactMethods.map((contactMethod, contactIndex) => (
          <Link
            to={contactMethod.url}
            className="contact-widget-container"
            aria-label={contactMethod.ariaLabel}
            key={contactIndex}
          >
            {handleIconDisplay(contactMethod as IconData)}
          </Link>
        ))}
      </div>
    </section>
  );
}
