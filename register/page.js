"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Nav from "../Nav"
import Footer from "../footer"
import md5 from "crypto-js/md5";

export default function Register() {
  const [name, setName]         = useState("")
  let [password, setPassword] = useState("")
  const [hide, sethide] = useState("hide")
  const router = useRouter()
  function handleSubmit(e) {
    e.preventDefault();
    password = md5(password).toString();
    fetch("http://127.0.0.1:8000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: name,
      passw: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        sethide("shows");
      } else {
        router.push("/login");
      }
    });}

  return (
    <>
      <Nav />
      <div className="form-wrapper">
        <div className="form-card">
          <h1>Create Account</h1>
          <p className="sub">Join BookerS and start booking your perfect hotel today.</p>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleSubmit}>
            Create Account
          </button>
          <p className={hide}>Username Already exists , try again</p>
          <p>
            Already have an account? <Link href="/login">Sign in here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}