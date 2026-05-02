import "../components/styles/ContactFooter.css"
import { myinfo } from "../data/myinfo.json"
import { IconsList } from "./IconList";

export const ContactFooter = () => 
{
    return (<div className="contact-footer">
    <h2>Contact Me</h2>
      <form target="_blank" action={"https://formsubmit.co/"} method="POST">
        <div className="form-buttons">
          <IconsList clickable={true} list={myinfo.contacts} />
        </div>
        <div className="form-grid">
          <div className="form-labels">
            <p>Your Name:</p>
            <p>Subject Line:</p>
            <p>Your Message:</p>
          </div>
          <div className="form-inputs">
            <input type="text" name="name" className="form-control" placeholder="Full Name" required />
            <input type="text" name="subject" className="form-control" placeholder="Subject Line" required />
            <textarea placeholder="Your Message" className="form-control" name="message" required />
          </div>
        </div>
        <button type="submit" className="btn btn-dark btn-block">Submit Form</button>
      </form>
      </div>);
}