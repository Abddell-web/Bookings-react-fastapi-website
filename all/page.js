"use client"
import { useEffect, useState } from "react"
import Nav from "../Nav"
import Footer from "../footer"
import { IoIosPricetag } from "react-icons/io"
import { FaRandom } from "react-icons/fa"
import { MdOutlineStarRate } from "react-icons/md"
import { RiCustomerServiceLine } from "react-icons/ri"
import { IoFastFoodSharp, IoPersonOutline } from "react-icons/io5"
import Link from "next/link"

const api_url = "http://127.0.0.1:8000"


const Categories = [
  { id: 0, name: "All",     icon: null },
  { id: 1, name: "Price",   icon: <IoIosPricetag /> },
  { id: 2, name: "Nearby",  icon: <FaRandom /> },
  { id: 3, name: "Rating",  icon: <MdOutlineStarRate /> },
  { id: 4, name: "Service", icon: <RiCustomerServiceLine /> },
  { id: 5, name: "Food",    icon: <IoFastFoodSharp /> },
  { id: 6, name: "Client",  icon: <IoPersonOutline /> },
]

const PER_PAGE = 12

export default function All() {
  const [category, setCategory] = useState("All")
  const [page, setPage]         = useState(1)
  const [infos, setinfos]         = useState([])
  useEffect(() => {
  fetch(`${api_url}/api/hotels`)
    .then((response) => response.json())
    .then((data) => setinfos(data))
    .catch((error) => console.error(error));
}, []);
  // Filter
  const filtered = category === "All"
    ? infos
    : infos.filter((h) => h.category === category)

  
  const totalPages  = Math.ceil(filtered.length / PER_PAGE)
  const start       = (page - 1) * PER_PAGE
  const visible     = filtered.slice(start, start + PER_PAGE)

  function selectCategory(name) {
    setCategory(name)
    setPage(1)          
  }
  return (
    <>
      <Nav />

      <section>
        <div className="section-heading">
          <h1>Browse All Hotels</h1>
          <p>Explore our full collection of hotels and find the one that fits your style.</p>
        </div>

        
        <div className="categ">
          {Categories.map((cat) => (
            <button
              key={cat.id}
              className={`categ-btn ${category === cat.name ? "active" : ""}`}
              onClick={() => selectCategory(cat.name)}
            >
              {cat.icon && cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "24px", fontSize: "0.9rem" }}>
          Showing {visible.length} of {filtered.length} hotels
          {category !== "All" && ` in "${category}"`}
        </p>

        
        {visible.length > 0 ? (
          <div className="hotels-grid">
            {visible.map((info) => (
              <div key={info.id} className="hotel-card">
                <img src={info.img} alt={info.name} />
                <div className="info">
                  <h3>{info.name}</h3>
                  <p>{info.description}</p>
                  <h2>{"⭐".repeat(info.rating)}</h2>
                  <Link href= {"\pages?id=" + info.id} className="btn btn-primary" >Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px 0" }}>
            No hotels found in this category.
          </p>
        )}

        
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={page === num ? "page-active" : ""}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            ))}

            <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
              Next →
            </button>
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}