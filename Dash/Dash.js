"use client"
import { useState , useEffect} from "react"
import Nav from "../Nav"
import Footer from "../footer"
import Link from 'next/link'
import { IoIosPricetag } from "react-icons/io"
import { FaRandom } from "react-icons/fa"
import { MdOutlineStarRate } from "react-icons/md"
import { RiCustomerServiceLine } from "react-icons/ri"
import { IoFastFoodSharp, IoPersonOutline } from "react-icons/io5"


const Categories = [
  { id: 1, name: "Price",   icon: <IoIosPricetag /> },
  { id: 2, name: "Nearby",  icon: <FaRandom /> },
  { id: 3, name: "Rating",  icon: <MdOutlineStarRate /> },
  { id: 4, name: "Service", icon: <RiCustomerServiceLine /> },
  { id: 5, name: "Food",    icon: <IoFastFoodSharp /> },
  { id: 6, name: "Client",  icon: <IoPersonOutline /> },
]

export default function Dash() {
   const [infos, setinfos]         = useState([])
    useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hotels")
      .then((response) => response.json())
      .then((data) => setinfos(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <Nav />

      
      <section className="hero">
        <h1>Find & Book Your Perfect Hotel Stay</h1>
        <p>
          Discover thousands of hotels worldwide — from luxury beach resorts to
          cozy mountain retreats. Your ideal getaway is just one click away.
        </p>
        <Link href="/all" className="btn btn-white">Browse Hotels</Link>
      </section>

      
      <div className="stats-row">
        <div className="stat-item"><h2>500+</h2><p>Hotels Available</p></div>
        <div className="stat-item"><h2>120+</h2><p>Destinations</p></div>
        <div className="stat-item"><h2>50k+</h2><p>Happy Guests</p></div>
        <div className="stat-item"><h2>4.8★</h2><p>Average Rating</p></div>
      </div>

      
      <section>
        <div className="section-heading">
          <h2>Browse by Category</h2>
          <p>Filter hotels by what matters most to you and find your perfect match.</p>
        </div>
        <div className="categ">
          {Categories.map((cat) => (
            <div key={cat.id}>
              {cat.icon}
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>Top Rated Hotels</h2>
          <p>Hand-picked selections loved by thousands of guests around the world.</p>
        </div>
        <div className="hotels-grid">
          {infos.map((info) => (
            <div key={info.id} className="hotel-card">
              <img src={info.img} alt={info.name} />
              <div className="info">
                <h3>{info.name}</h3>
                <p>{info.description}</p>
                <h2>{"⭐".repeat(info.rating)}</h2>
                <Link href={"\pages?id=" + info.id} className="btn btn-primary">Book Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <h1>Ready to Find Your Dream Stay?</h1>
        <p>Join over 50,000 happy guests who booked their perfect hotel with BookerS.</p>
        <Link href="/all" className="btn btn-white">Book Now</Link>
      </section>

      <Footer />
    </>
  )
}