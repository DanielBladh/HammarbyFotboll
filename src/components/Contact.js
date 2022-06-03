import { FaUserAlt, FaPhoneAlt, FaEnvelope, FaComments, FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const sendEmail = (e) => {
    e.preventDefault();

    emailjs
        .sendForm(
            "service_0lva9xy",
            "template_5da4bkj",
            e.target,
            "user_XZBKqWWgNFKlnaYBryake"
        )
        .then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );
    e.target.reset();
};

const Contact = () => {
    return (
        <>
            <div className="contact-container">
                <div className="contact-form">
                    <h2 className="contact-title">Kontakta oss</h2>
                    <p className="contact-text">
                        <h2 className="contact-title-second ">POST & BESÖKSADRESS</h2>
                        Hammarby fotboll AB / Hammarby IF fotbollförening
                        Orrfjärdsgränd 13
                        120 53 Årsta
                        Tel: 08-462 88 10 (öppen tisdagar och torsdagar mellan 10.00-12.00).
                    </p>
                    <form onSubmit={sendEmail} className="contactForm">
                        <div className="row">
                            <div className="input-group">
                                <input type="text" id="input-name" name="name" required />
                                <label for="name" id="contact-label"><FaUserAlt /> Your Name</label>
                            </div>
                            <div className="input-group">
                                <input type="text" id="input-number" name="number" required />
                                <label for="number" id="contact-label"><FaPhoneAlt /> Phone No.</label>
                            </div>
                        </div>
                        <div className="input-group">
                            <input type="text" id="input-email" name="email" required />
                            <label for="email" id="contact-label"><FaEnvelope /> Email</label>
                        </div>
                        <div className="input-group">
                            <textarea id="input-message" rows="8" name="message" required></textarea>
                            <label for="message" id="contact-label"><FaComments /> Your Message</label>
                        </div>
                        <button type="submit" id="btn-submit">Submit <FaPaperPlane /></button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;