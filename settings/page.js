"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Nav from "../Nav"
import Footer from "../footer"

const API = "http://127.0.0.1:8000"

export default function Settings() {
  const router = useRouter()

  const [userId,   setUserId]   = useState(null)
  const [username, setUsername] = useState("")

  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [newEmail,    setNewEmail]    = useState("")

  const [bookings, setBookings] = useState([])
  const [hotels,   setHotels]   = useState([])

  const [usernameMsg, setUsernameMsg] = useState(null)
  const [passwordMsg, setPasswordMsg] = useState(null)
  const [emailMsg,    setEmailMsg]    = useState(null)
  const [loading,     setLoading]     = useState(true)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!loggedIn) { router.push("/login"); return }

    const id   = Number(localStorage.getItem("userId"))
    const name = localStorage.getItem("username") ?? ""
    setUserId(id)
    setUsername(name)
    setNewUsername(name)
    setNewEmail(localStorage.getItem("email") ?? "")

    Promise.all([
      fetch(`${API}/api/bookings`).then(r => r.json()),
      fetch(`${API}/api/hotels`).then(r => r.json()),
    ]).then(([bData, hData]) => {
      const myBookings = Array.isArray(bData)
        ? bData.filter(b => b.user_id === id)
        : []
      setBookings(myBookings)
      setHotels(Array.isArray(hData) ? hData : [])
    }).catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  function hotelName(hotel_id) {
    return hotels.find(h => h.id === hotel_id)?.name ?? `Hotel #${hotel_id}`
  }

  async function handleUsername() {
    setUsernameMsg(null)
    if (!newUsername.trim()) {
      setUsernameMsg({ type: "err", text: "Username cannot be empty." }); return
    }
    const res  = await fetch(`${API}/api/users/${userId}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ username: newUsername, passw: localStorage.getItem("passw") ?? "" })
    })
    const data = await res.json()
    if (data.detail) {
      setUsernameMsg({ type: "err", text: data.detail }); return
    }
    localStorage.setItem("username", newUsername)
    setUsername(newUsername)
    setUsernameMsg({ type: "ok", text: "Username updated successfully!" })
  }

  async function handleEmail() {
    setEmailMsg(null)
    if (!newEmail.trim()) {
      setEmailMsg({ type: "err", text: "Email cannot be empty." }); return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newEmail)) {
      setEmailMsg({ type: "err", text: "Please enter a valid email address." }); return
    }
    const res  = await fetch(`${API}/api/users/${userId}/email`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email: newEmail })
    })
    const data = await res.json()
    if (data.detail) {
      setEmailMsg({ type: "err", text: data.detail }); return
    }
    localStorage.setItem("email", newEmail)
    setEmailMsg({ type: "ok", text: "Email updated successfully!" })
  }

  async function handlePassword() {
    setPasswordMsg(null)
    if (!newPassword) {
      setPasswordMsg({ type: "err", text: "Password cannot be empty." }); return
    }
    if (newPassword !== confirmPass) {
      setPasswordMsg({ type: "err", text: "Passwords do not match." }); return
    }
    const res  = await fetch(`${API}/api/users/${userId}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ username: newUsername, passw: newPassword })
    })
    const data = await res.json()
    if (data.detail) {
      setPasswordMsg({ type: "err", text: data.detail }); return
    }
    localStorage.setItem("passw", newPassword)
    setNewPassword("")
    setConfirmPass("")
    setPasswordMsg({ type: "ok", text: "Password updated successfully!" })
  }

  async function handleCancelBooking(bookingId) {
    if (!confirm("Cancel this booking?")) return
    await fetch(`${API}/api/bookings/${bookingId}`, { method: "DELETE" })
    setBookings(prev => prev.filter(b => b.id !== bookingId))
  }

  function Msg({ msg }) {
    if (!msg) return null
    return (
      <p className={`settings-msg ${msg.type === "ok" ? "settings-msg-ok" : "settings-msg-err"}`}>
        {msg.type === "ok" ? "✅" : "⚠️"} {msg.text}
      </p>
    )
  }

  if (loading) return <><Nav /><p style={{ padding: "2rem" }}>Loading…</p><Footer /></>

  return (
    <>
      <Nav />

      <section className="settings-wrapper">

        <div className="settings-header">
          <div className="settings-avatar">{username.charAt(0).toUpperCase()}</div>
          <div>
            <h1 className="settings-title">Account Settings</h1>
            <p className="settings-sub">Manage your profile and bookings, {username}.</p>
          </div>
        </div>

        <div className="settings-grid">

          <div className="settings-col">

            <div className="settings-card">
              <div className="settings-card-head">
                <div>
                  <h2>Change Username</h2>
                  <p>Update the name shown on your account.</p>
                </div>
              </div>
              <div className="form-group">
                <label>New Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={e => { setNewUsername(e.target.value); setUsernameMsg(null) }}
                  placeholder="Enter new username"
                />
              </div>
              <Msg msg={usernameMsg} />
              <button className="btn btn-primary settings-btn" onClick={handleUsername}>
                Save Username
              </button>
            </div>

            <div className="settings-card">
              <div className="settings-card-head">
                <div>
                  <h2>Change Email</h2>
                  <p>Update the email address linked to your account.</p>
                </div>
              </div>
              <div className="form-group">
                <label>New Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={e => { setNewEmail(e.target.value); setEmailMsg(null) }}
                  placeholder="Enter new email"
                />
              </div>
              <Msg msg={emailMsg} />
              <button className="btn btn-primary settings-btn" onClick={handleEmail}>
                Save Email
              </button>
            </div>

            <div className="settings-card">
              <div className="settings-card-head">
                <div>
                  <h2>Change Password</h2>
                  <p>Choose a strong password to keep your account safe.</p>
                </div>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => { setNewPassword(e.target.value); setPasswordMsg(null) }}
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={e => { setConfirmPass(e.target.value); setPasswordMsg(null) }}
                  placeholder="Repeat new password"
                />
              </div>
              <Msg msg={passwordMsg} />
              <button className="btn btn-primary settings-btn" onClick={handlePassword}>
                Save Password
              </button>
            </div>

          </div>

          <div className="settings-col">
            <div className="settings-card settings-card-full">
              <div className="settings-card-head">
                <div>
                  <h2>My Bookings</h2>
                  <p>{bookings.length} booking{bookings.length !== 1 ? "s" : ""} on your account.</p>
                </div>
              </div>

              {bookings.length === 0 ? (
                <div className="settings-empty">
                  <span>🏨</span>
                  <p>You have no bookings yet.</p>
                  <a href="/all" className="btn btn-primary" style={{ marginTop: "12px" }}>Browse Hotels</a>
                </div>
              ) : (
                <div className="settings-bookings">
                  {bookings.map((b, i) => (
                    <div key={b.id ?? i} className="settings-booking-row">
                      <div className="settings-booking-info">
                        <h3>{hotelName(b.hotel_id)}</h3>
                        <div className="settings-booking-meta">
                          <span className={`admin-badge ${b.payed ? "badge-green" : "badge-red"}`}>
                            {b.payed ? "Paid" : "Pay Later"}
                          </span>
                          <span className="settings-booking-id">Booking #{b.id}</span>
                        </div>
                      </div>
                      <button
                        className="tbl-btn tbl-del"
                        onClick={() => handleCancelBooking(b.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}