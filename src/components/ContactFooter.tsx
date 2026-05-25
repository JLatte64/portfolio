import "../components/styles/ContactFooter.css";
import {myinfo} from "../data/myinfo.json";
import {IconsList} from "./IconList";

export function ContactFooter() {
  return (
    <section className="contact-content" id="contact">
      <h2>Contact Me</h2>
      <form target="_blank" action={"https://formsubmit.co/"} method="POST">
        <div className="form-buttons">
          <IconsList clickable={true} list={myinfo.contacts} />
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
