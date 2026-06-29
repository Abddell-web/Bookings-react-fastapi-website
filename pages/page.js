"use client"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Nav from "../Nav"
import Footer from "../footer"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Pages() {
  const [isLogged, setIsLogged] = useState(false)
  const [hotel,    setHotel]    = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [booking,  setBooking]  = useState(false)  

  const search = useSearchParams()
  const router = useRouter()
  const id     = Number(search.get("id"))

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/hotels/${id}`)
      .then(res  => res.json())
      .then(data => {
        setHotel(data)
        setIsLogged(localStorage.getItem("isLoggedIn") === "true")
      })
      .catch(err => console.error(err))
      .finally(()=> setLoading(false))
  }, [id])

  function handleBookNow(payed) {
    if (!isLogged) {
      router.push("/login")
      return
    }

    if (booking) return         
    setBooking(true)

    const id_user = Number(localStorage.getItem("userId"))

    fetch("http://127.0.0.1:8000/api/bookings", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id_user, id_hotel: id, payed }),
    })
      .then(res  => res.json())
      .then(data => {
        if (data.id) {
          router.push("/thank")
        } else {
          console.error("Booking failed:", data)
          setBooking(false)
        }
      })
      .catch(err => {
        console.error(err)
        setBooking(false)
      })
  }

  if (loading) return <><Nav /><p style={{ padding: "2rem" }}>Loading...</p><Footer /></>

  if (!hotel || Object.keys(hotel).length === 0) return (
    <>
      <Nav />
      <div className="not-found-wrapper">
        <div><svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 576 512" height="1em" width="1em" ><path d="M560 64c8.84 0 16-7.16 16-16V16c0-8.84-7.16-16-16-16H16C7.16 0 0 7.16 0 16v32c0 8.84 7.16 16 16 16h15.98v384H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h240v-80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v80h240c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16h-16V64h16zm-304 44.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm0 96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm-128-96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zM179.2 256h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8zM192 384c0-53.02 42.98-96 96-96s96 42.98 96 96H192zm256-140.8c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-96c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4z" /></svg></div>
        <h2>Hotel not found</h2>
        <p>The hotel you're looking for doesn't exist or the link is invalid.</p>
        <a href="/all" className="btn btn-primary" style={{ marginTop: "12px" }}>Browse Hotels</a>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Nav />

      <img
        src={hotel.img?.replace("/400/300", "/1200/420")}
        alt={hotel.name}
        className="hotel-hero-img"
      />

      <section>
        <div className="hotel-detail-layout">

          <div>
            <span className="hotel-badge">{hotel.category}</span>
            <h1 className="hotel-detail-title">{hotel.name}</h1>
            <p className="hotel-detail-rating">{"⭐".repeat(hotel.rating ?? 0)}</p>
            <p className="hotel-detail-desc">{hotel.description}</p>

            <h3 className="hotel-detail-section-title">Hotel Highlights</h3>
            <div className="hotel-highlights">
              {hotel.highlights?.map((h) => (
                <div key={h.label} className="hotel-highlight-item">
                  <h4>{h.label}</h4>
                  <p>{h.value}</p>
                </div>
              ))}
              <div className="hotel-highlight-item"><h4>Check-In</h4>   <p>{hotel.checkIn}</p></div>
              <div className="hotel-highlight-item"><h4>Check-Out</h4>  <p>{hotel.checkOut}</p></div>
              <div className="hotel-highlight-item"><h4>Total Rooms</h4><p>{hotel.rooms} rooms</p></div>
              <div className="hotel-highlight-item"><h4>Languages</h4>  <p>{hotel.languages}</p></div>
            </div>

            <h3 className="hotel-detail-section-title">Amenities & Services</h3>
            <div className="hotel-amenities">
              {hotel.amenities?.map((a) => (
                <span key={a} className="hotel-amenity-tag">{a}</span>
              ))}
            </div>

            <a href="/all" className="hotel-back-link">← Back to all hotels</a>
          </div>

          
          <div className="booking-card">
            <h2>Reserve Your Stay</h2>
            <p className="sub">Secure your room at {hotel.name} today.</p>

            <div className="booking-price-box">
              <p>Starting from</p>
              <h2>${hotel.price}<span> / night</span></h2>
            </div>

            <div className="booking-facts">
              <div className="contact-detail" style={{ marginBottom: 0 }}>
                <div className="cd-icon"> <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" ><circle cx={12} cy={12} r={4} /><path d="M13,4.069V2h-2v2.069C7.389,4.522,4.523,7.389,4.069,11H2v2h2.069c0.454,3.611,3.319,6.478,6.931,6.931V22h2v-2.069 c3.611-0.453,6.478-3.319,6.931-6.931H22v-2h-2.069C19.478,7.389,16.611,4.522,13,4.069z M12,18c-3.309,0-6-2.691-6-6s2.691-6,6-6 s6,2.691,6,6S15.309,18,12,18z" /></svg> </div>
                <div><h4>Location</h4><p>{hotel.location}</p></div>
              </div>
              <div className="contact-detail" style={{ marginBottom: 0 }}>
                <div className="cd-icon"><svg stroke="black" fill="yellow" strokeWidth={0} viewBox="0 0 1024 1024" height="1em" width="1em" ><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" /></svg></div>
                <div><h4>Rating</h4><p>{hotel.rating} out of 5 stars</p></div>
              </div>
              <div className="contact-detail" style={{ marginBottom: 0 }}>
                <div className="cd-icon"><svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 576 512" height="1em" width="1em" ><path d="M560 64c8.84 0 16-7.16 16-16V16c0-8.84-7.16-16-16-16H16C7.16 0 0 7.16 0 16v32c0 8.84 7.16 16 16 16h15.98v384H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h240v-80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v80h240c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16h-16V64h16zm-304 44.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm0 96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm-128-96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zM179.2 256h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8zM192 384c0-53.02 42.98-96 96-96s96 42.98 96 96H192zm256-140.8c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-96c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4z" /></svg></div>
                <div><h4>Founded</h4><p>Est. {hotel.founded}</p></div>
              </div>
              <div className="contact-detail" style={{ marginBottom: 0 }}>
                <div className="cd-icon"><svg stroke="currentColor" fill="green" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg></div>
                <div><h4>Availability</h4><p>Rooms available now</p></div>
              </div>
            </div>

            {isLogged ? (
              <div className="booking-actions">
                
                <button
                  className="btn btn-primary"
                  style={{ width: "100%", opacity: booking ? 0.6 : 1 }}
                  onClick={() => handleBookNow(1)}
                  disabled={booking}
                >
                  {booking ? "Processing…" : " Pay Now"}
                </button>
                <button
                  className="btn btn-outline"
                  style={{ width: "100%", opacity: booking ? 0.6 : 1 }}
                  onClick={() => handleBookNow(0)}
                  disabled={booking}
                >
                  {booking ? "Processing…" : " Pay Later"}
                </button>
              </div>
            ) : (
              <>
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => handleBookNow(0)}
                >
                  Book Now
                </button>
                <p className="booking-hint">
                  You need to <a href="/login">sign in</a> to complete your booking.
                </p>
              </>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}