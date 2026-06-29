"use client"
import { useState } from "react"
import Nav from "../Nav"
import Footer from "../footer"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(form)
    setSent(true)
  }

  return (
    <>
      <Nav />
      <section className="about-hero">
        <h1>Get In Touch</h1>
        <p>
          Have a question, a special request, or just want to say hello?
          Our team is here to help you 7 days a week.
        </p>
      </section>

      <section>
        <div className="contact-layout">
          <div className="contact-info">
            <h2>We'd love to hear from you</h2>
            <p>
              Whether you need help finding the perfect hotel, have a booking
              question, or want to partner with us — reach out and we'll get
              back to you within 24 hours.
            </p>

            <div className="contact-detail">
              <div className="cd-icon"> <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" ><path fill="none" stroke="#000" strokeWidth={2} d="M12,22 C12,22 4,16 4,10 C4,5 8,2 12,2 C16,2 20,5 20,10 C20,16 12,22 12,22 Z M12,13 C13.657,13 15,11.657 15,10 C15,8.343 13.657,7 12,7 C10.343,7 9,8.343 9,10 C9,11.657 10.343,13 12,13 L12,13 Z" /></svg>
</div>
              <div>
                <h4>Address</h4>
                <p>12 Boulevard Hassan II, Casablanca, Morocco</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="cd-icon"> <svg stroke="currentColor" fill="black" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em"><path d="M17.707,12.293c-0.391-0.391-1.023-0.391-1.414,0l-1.594,1.594c-0.739-0.22-2.118-0.72-2.992-1.594 s-1.374-2.253-1.594-2.992l1.594-1.594c0.391-0.391,0.391-1.023,0-1.414l-4-4c-0.391-0.391-1.023-0.391-1.414,0L3.581,5.005 c-0.38,0.38-0.594,0.902-0.586,1.435c0.023,1.424,0.4,6.37,4.298,10.268s8.844,4.274,10.269,4.298c0.005,0,0.023,0,0.028,0 c0.528,0,1.027-0.208,1.405-0.586l2.712-2.712c0.391-0.391,0.391-1.023,0-1.414L17.707,12.293z M17.58,19.005 c-1.248-0.021-5.518-0.356-8.873-3.712c-3.366-3.366-3.692-7.651-3.712-8.874L7,4.414L9.586,7L8.293,8.293 C8.054,8.531,7.952,8.875,8.021,9.205c0.024,0.115,0.611,2.842,2.271,4.502s4.387,2.247,4.502,2.271 c0.333,0.071,0.674-0.032,0.912-0.271L17,14.414L19.586,17L17.58,19.005z" /></svg></div>
              <div>
                <h4>Phone</h4>
                <p>+1 (234) 567-8990</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="cd-icon"><svg stroke="black" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
              <div>
                <h4>Email</h4>
                <p>hello@bookers.com</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="cd-icon"><svg stroke="currentColor" fill="black" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" ><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z" /><path d="M13 7L11 7 11 13 17 13 17 11 13 11z" /></svg></div>
              <div>
                <h4>Working Hours</h4>
                <p>Monday – Sunday, 8:00 AM – 10:00 PM</p>
              </div>
            </div>
          </div>

          
          <div className="form-card">
            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
                <h2 style={{ marginBottom: "10px" }}>Message Sent!</h2>
                <p style={{ color: "var(--text-muted)" }}>
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: "24px" }}
                  onClick={() => { setForm({ name: "", email: "", subject: "", message: "" }); setSent(false) }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h1>Send a Message</h1>
                <p className="sub">Fill in the form and we'll be in touch shortly.</p>

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={handleSubmit}
                >
                  Send Message
                </button>
              </>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}