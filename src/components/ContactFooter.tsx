import {Link} from "react-router";
import "../components/styles/ContactFooter.css";
import {myinfo} from "../data/myinfo.json";

export function ContactFooter() {
  return (
    <section className="contact-content" id="contact">
      <h2>Contact Me</h2>
      <form target="_blank" action={"https://formsubmit.co/"} method="POST">
        <div className="form-buttons">
          {myinfo.contactMethods.map((contactMethod, contactIndex) => (
            <Link to={contactMethod.url}>
              <img
                src={`${import.meta.env.BASE_URL}/icons/${contactMethod.iconFilename}`}
                aria-label={contactMethod.ariaLabel}
                key={contactIndex}
              />
            </Link>
          ))}
        </div>
        <div className="form-inputs">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            name="subject"
            className="form-control"
            placeholder="Subject Line"
            required
          />
          <textarea
            placeholder="Your Message"
            className="form-control"
            name="message"
            required
          />
        </div>
        <button type="submit" className="btn btn-dark btn-block">
          Send Message
        </button>
      </form>
    </section>
  );
}
