import "../components/styles/contactFooter.css";
import { myinfo } from "../data/myinfo.json";
import "./styles/button-styles/buttons.css";
import { CardGrid } from "./cards/CardGrid";
import type { CardData } from "./cards/Card";
import { ContactCard, type ContactCardData } from "./cards/ContactMethodCard";
import { useId } from "react";

export function ContactFooter() {
  const nameInputId = useId();
  const emailInputId = useId();
  const messageInputId = useId();

  return (
    <section
      className="contact-content"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading">Contact Me</h2>
      <p>Send me a message!</p>

      <form
        target="_blank"
        action={`https://formsubmit.co{myinfo.email}`}
        method="POST"
        className="form"
        aria-label="Contact message form"
      >
        <div className="form-inputs-container">
          {/* FIELD 1: NAME INPUT */}
          <div className="form-field-group">
            <label htmlFor={nameInputId} className="sr-only">
              Your Name
            </label>
            <input
              id={nameInputId}
              type="text"
              name="name"
              className="form-input"
              placeholder="Your Name"
              required
              aria-required="true"
            />
          </div>

          {/* FIELD 2: EMAIL INPUT (Replaces the generic subject to collect reply handles) */}
          <div className="form-field-group">
            <label htmlFor={emailInputId} className="sr-only">
              Your Email Address
            </label>
            <input
              id={emailInputId}
              type="email"
              name="email"
              className="form-input"
              placeholder="Your Email Address"
              required
              aria-required="true"
            />
          </div>

          {/* FIELD 3: MESSAGE TEXTAREA */}
          <div className="form-field-group">
            <label htmlFor={messageInputId} className="sr-only">
              Message Text
            </label>
            <textarea
              id={messageInputId}
              className="form-input"
              name="message"
              placeholder="Message Text"
              required
              aria-required="true"
            />
          </div>

          <button type="submit" className="form-button button">
            Send Message
          </button>
        </div>
      </form>

      <p>Or reach me at:</p>
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
