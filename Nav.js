"use client"
import { useState , useEffect } from "react"
import Link from 'next/link'
import ProfileButton from './about/ProfileButton'

export default function Nav() {
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsActive(localStorage.getItem("isLoggedIn") === "true");
    setIsAdmin(localStorage.getItem("userId") === "1" && localStorage.getItem("username") == "adminofBookers");
    
  }, []);
  return (
    <nav>
      <h1>BookerS</h1>
      <div>
        {isAdmin ? <Link href="/admin">Admin</Link> : null}
        <Link href="/">Home</Link>
        <Link href="/all">Browse Hotels</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      {isActive ? <ProfileButton /> : <Link href="/login">Log In</Link>}
    </nav>
  )
}