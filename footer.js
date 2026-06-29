import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div>
        <h3>BookerS</h3>
        <p>
          Your trusted platform for discovering and booking the world's finest
          hotels. From beachfront resorts to mountain retreats, we make every
          stay unforgettable.
        </p>
      </div>

      <div>
        <h4>Quick Links</h4>
        <div>
          <Link href="/">Home</Link>
          <Link href="/all">Browse Hotels</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>

      <div>
        <h3>Get In Touch</h3>
        <h5>+1 (234) 567‑8990</h5>
        <h5>hello@bookers.com</h5>
      </div>
    </footer>
  )
}