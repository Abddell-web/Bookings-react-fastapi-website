"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Nav from "../Nav"
import Footer from "../footer"
import md5 from "crypto-js/md5";



export default function Login() {
  const [name, setname]       = useState("")
  let [password, setPassword] = useState("")
  const [hide, sethide] = useState("hide")
  const router = useRouter()
  function handleSubmit(e) {
    e.preventDefault();

    const hashedPassword = md5(password).toString();

    fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        passw: hashedPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.username == "Username  or password incorrect" || data.error) {
          sethide("shows");
        } else {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userId", data.id);
          localStorage.setItem("username", data.username);

          router.push("/");
        }
      });
  }

  return (
    <>
      <Nav />
      <div className="form-wrapper">
        <div className="form-card">
          <h1>Welcome Back</h1>
          <p className="sub">Sign in to your BookerS account to manage your bookings.</p>

          <div className="form-group">
            <label htmlFor="name">username</label>
            <input
              id="name"
              type="name"
              placeholder="john"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleSubmit}>
            Sign In
          </button>
          <p className={hide}>Username  or password incorrect , try again</p>
          <p>
            Don't have an account? <Link href="/register">Register here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}