import Nav from "../Nav"
import Footer from "../footer"
import Link from "next/link"

export default function ThankYou() {
  return (
    <>
      <Nav />

      <section className="thankyou-wrapper">

        
        <div className="thankyou-icon">✅</div>

       
        <h1 className="thankyou-title">Thank You for Booking with BookerS!</h1>
        <p className="thankyou-sub">
          Your reservation has been confirmed. We've sent a confirmation
          email with all your booking details. We can't wait to welcome you!
        </p>

        
        <div className="thankyou-card">
          <div className="thankyou-card-row">
            <span>Booking Status</span>
            <strong className="thankyou-status">Confirmed</strong>
          </div>
          <div className="thankyou-card-row">
            <span>Confirmation</span>
            <strong>Sent to your email</strong>
          </div>
          <div className="thankyou-card-row">
            <span>Check-In</span>
            <strong>As per your booking</strong>
          </div>
          <div className="thankyou-card-row">
            <span>Payment</span>
            <strong>Processed Successfully</strong>
          </div>
        </div>

        =
        <div className="thankyou-steps">
          <h2>What Happens Next?</h2>
          <div className="thankyou-steps-grid">
            <div className="thankyou-step">
              <div className="thankyou-step-num">1</div>
              <h3>Check Your Email</h3>
              <p>A full confirmation with your booking reference has been sent to your inbox.</p>
            </div>
            <div className="thankyou-step">
              <div className="thankyou-step-num">2</div>
              <h3>Prepare for Your Trip</h3>
              <p>Review the hotel amenities, check-in time, and any special instructions included in your email.</p>
            </div>
            <div className="thankyou-step">
              <div className="thankyou-step-num">3</div>
              <h3>Enjoy Your Stay</h3>
              <p>Arrive, relax, and let the hotel team take care of everything else.</p>
            </div>
          </div>
        </div>
        <div className="thankyou-actions">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/all" className="btn btn-outline">Browse More Hotels</Link>
        </div>

      </section>

      <Footer />
    </>
  )
}