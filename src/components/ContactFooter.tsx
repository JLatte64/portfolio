import "../components/styles/contactFooter.css";
import { myinfo } from "../data/myinfo.json";
import "./styles/buttons.css";
import { CardGrid } from "./cards/CardGrid";
import type { CardData } from "./cards/Card";
import { ContactCard, type ContactCardData } from "./cards/ContactMethodCard";

export function ContactFooter() {
  return (
    <section className="contact-content" id="contact">
      <h2>Contact Me</h2>
      <p>Send me a message!</p>
      <form
        target="_blank"
        action={`https://formsubmit.co/${myinfo.email}`}
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
      <CardGrid
        className="contact"
        items={
          (myinfo?.contactMethods ?? []).map((method, idx) => {
            const cleanLabel = (method.ariaLabel ?? "method")
              .toLowerCase()
              .replace(/\s+/g, "-");

            return {
              ...method,
              id: (method as any).id || `contact-${cleanLabel}-${idx}`,
            };
          }) as CardData<ContactCardData>[]
        }
        renderComponent={ContactCard}
      />
    </section>
  );
}
