"use client"
import { useState, useEffect } from "react"
import Nav from "../Nav"

const API = "http://localhost:8000"


function Badge({ children, type = "blue" }) {
  return <span className={`admin-badge badge-${type}`}>{children}</span>
}

function Modal({ title, onClose, children }) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <button className="admin-modal-close" onClick={onClose}>X</button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

const blankHotel = {
  name: "", description: "", rating: 3, img: "", category: "",
  location: "", price: "", rooms: "", founded: "", checkIn: "",
  checkOut: "", languages: "", amenities: "", highlights: ""
}


function UsersTab() {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form,    setForm]    = useState({ username: "", passw: "" })
  const [error,   setError]   = useState("")

  async function load() {
    setLoading(true)
    try {
      const res  = await fetch(`${API}/api/users`)
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch {
      setUsers([])
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id) {
    if (!confirm("Delete this user?")) return
    await fetch(`${API}/api/users/${id}`, { method: "DELETE" })
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  function openEdit(user) {
    setEditing(user)
    setForm({ username: user.username, passw: user.passw })
    setError("")
  }

  async function handleSave() {
    const res  = await fetch(`${API}/api/users/${editing.id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(form)
    })
    const data = await res.json()
    if (data.detail) { setError(data.detail); return }
    
    setUsers(prev => prev.map(u => u.id === editing.id ? { ...u, ...data } : u))
    setEditing(null)
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Users</h1>
        <Badge type="blue">{users.length} total</Badge>
      </div>

      <div className="admin-stats">
        <div className="admin-stat"><p>Total Users</p><h2>{users.length}</h2></div>
        <div className="admin-stat"><p>Admins</p>  <h2>{users.filter(u => u.id === 1).length}</h2></div>
        <div className="admin-stat"><p>Regular</p> <h2>{users.filter(u => u.id !== 1).length}</h2></div>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-state">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="admin-state">No users found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th><th>Username</th><th>Role</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td style={{ color: "var(--text-muted)" }}>{u.id}</td>
                  <td><strong>{u.username}</strong></td>
                  <td>
                    {u.id === 1 ? <Badge type="blue">Admin</Badge>: <Badge type="green">User</Badge>}
                  </td>
                  <td>
                    <button className="tbl-btn tbl-edit" onClick={() => openEdit(u)}>Edit</button>
                    <button className="tbl-btn tbl-del"  onClick={() => handleDelete(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <Modal title={`Edit — ${editing.username}`} onClose={() => setEditing(null)}>
          {error && <p style={{ color: "#dc2626", marginBottom: 12, fontSize: "0.875rem" }}>{error}</p>}
          <div className="form-group">
            <label>Username</label>
            <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.passw} onChange={e => setForm({ ...form, passw: e.target.value })} />
          </div>
          <div className="admin-modal-actions">
            <button className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
          </div>
        </Modal>
      )}
    </>
  )
}

function HotelsTab() {
  const [hotels,  setHotels]  = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)
  const [form,    setForm]    = useState(blankHotel)
  const [editing, setEditing] = useState(null)
  const [error,   setError]   = useState("")

  async function load() {
    setLoading(true)
    try {
      const res  = await fetch(`${API}/api/hotels`)
      const data = await res.json()
      setHotels(Array.isArray(data) ? data : [])
    } catch {
      setHotels([])
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function buildPayload() {
    return {
      name:        form.name,
      description: form.description,
      rating:      Number(form.rating),
      img:         form.img,
      category:    form.category,
      location:    form.location,
      price:       Number(form.price),
      rooms:       Number(form.rooms),
      founded:     Number(form.founded),
      checkIn:     form.checkIn,
      checkOut:    form.checkOut,
      languages:   form.languages,
      amenities: typeof form.amenities === "string"
        ? form.amenities.split(",").map(s => s.trim()).filter(Boolean)
        : form.amenities,
      highlights: typeof form.highlights === "string"
        ? form.highlights.split(";").map(s => {
            const [label = "", value = ""] = s.split(":").map(x => x.trim())
            return { label, value }
          }).filter(h => h.label)
        : (Array.isArray(form.highlights)
            ? form.highlights
            : []),
    }
  }

  async function handleAdd() {
    setError("")
    const res  = await fetch(`${API}/api/hotels`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(buildPayload())
    })
    const data = await res.json()
    if (data.detail) { setError(data.detail); return }
    setHotels(prev => [...prev, data])
    setModal(null)
    setForm(blankHotel)
  }

  async function handleSave() {
    setError("")
    const payload = buildPayload()
    const res  = await fetch(`${API}/api/hotels/${editing}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload)
    })
    const data = await res.json()
    if (data.detail) { setError(data.detail); return }
    setHotels(prev => prev.map(h => h.id === editing ? { ...h, ...data } : h))
    setModal(null)
  }

  function openEdit(hotel) {
    setEditing(hotel.id)
    setError("")
    setForm({
      ...hotel,
      amenities:  Array.isArray(hotel.amenities)
        ? hotel.amenities.join(", ")
        : hotel.amenities,
      highlights: Array.isArray(hotel.highlights)
        ? hotel.highlights.map(h => `${h.label}:${h.value}`).join("; ")
        : hotel.highlights,
    })
    setModal("edit")
  }

  async function handleDelete(id) {
    if (!confirm("Delete this hotel?")) return
    await fetch(`${API}/api/hotels/${id}`, { method: "DELETE" })
    setHotels(prev => prev.filter(h => h.id !== id))
  }

  function Field({ k, label, type = "text", span = 1 }) {
    return (
      <div className="form-group" style={{ gridColumn: `span ${span}` }}>
        <label>{label}</label>
        {type === "textarea"
          ? <textarea value={form[k] ?? ""} onChange={e => setForm({ ...form, [k]: e.target.value })} />
          : <input type={type} value={form[k] ?? ""} onChange={e => setForm({ ...form, [k]: e.target.value })} />
        }
      </div>
    )
  }

  function FormFields() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <Field k="name"        label="Name" />
        <Field k="location"    label="Location" />
        <Field k="category"    label="Category" />
        <Field k="price"       label="Price / night"  type="number" />
        <Field k="rating"      label="Rating (1-5)"   type="number" />
        <Field k="rooms"       label="Rooms"          type="number" />
        <Field k="founded"     label="Founded"        type="number" />
        <Field k="checkIn"     label="Check-In" />
        <Field k="checkOut"    label="Check-Out" />
        <Field k="languages"   label="Languages" />
        <Field k="img"         label="Image URL"      span={2} />
        <Field k="description" label="Description"    type="textarea" span={2} />
        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label>Amenities <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(comma separated)</span></label>
          <input
            value={form.amenities ?? ""}
            onChange={e => setForm({ ...form, amenities: e.target.value })}
            placeholder="Pool, Wi-Fi, Breakfast"
          />
        </div>
        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label>Highlights <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(Label:Value; Label:Value)</span></label>
          <input
            value={form.highlights ?? ""}
            onChange={e => setForm({ ...form, highlights: e.target.value })}
            placeholder="Location:Paris; Rooms:Standard & Suite"
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Hotels</h1>
        <button className="btn btn-primary" onClick={() => { setForm(blankHotel); setError(""); setModal("add") }}>
          + Add Hotel
        </button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat"><p>Total Hotels</p><h2>{hotels.length}</h2></div>
        <div className="admin-stat"><p>5-Star</p>      <h2>{hotels.filter(h => h.rating === 5).length}</h2></div>
        <div className="admin-stat"><p>Avg Price</p>
          <h2>${hotels.length
            ? Math.round(hotels.reduce((a, h) => a + Number(h.price), 0) / hotels.length)
            : 0}
          </h2>
        </div>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-state">Loading hotels...</p>
        ) : hotels.length === 0 ? (
          <p className="admin-state">No hotels yet. Add one above.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th><th>Name</th><th>Location</th><th>Category</th>
                <th>Rating</th><th>Price</th><th>Rooms</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map(h => (
                <tr key={h.id}>
                  <td style={{ color: "var(--text-muted)" }}>{h.id}</td>
                  <td><strong>{h.name}</strong></td>
                  <td>{h.location}</td>
                  <td><Badge type="blue">{h.category}</Badge></td>
                  <td>{Number(h.rating)}/5</td>
                  <td>${h.price}</td>
                  <td>{h.rooms}</td>
                  <td>
                    <button className="tbl-btn tbl-edit" onClick={() => openEdit(h)}>Edit</button>
                    <button className="tbl-btn tbl-del"  onClick={() => handleDelete(h.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {(modal === "add" || modal === "edit") && (
        <Modal title={modal === "add" ? "Add New Hotel" : "Edit Hotel"} onClose={() => setModal(null)}>
          {error && <p style={{ color: "#dc2626", marginBottom: 12, fontSize: "0.875rem" }}>{error}</p>}
          <FormFields />
          <div className="admin-modal-actions">
            <button className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={modal === "add" ? handleAdd : handleSave}>
              {modal === "add" ? "Add Hotel" : "Save Changes"}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

function BookingsTab() {
  const [bookings, setBookings] = useState([])
  const [loading,  setLoading]  = useState(true)

  async function load() {
    setLoading(true)
    try {
      const res  = await fetch(`${API}/api/bookings`)
      const data = await res.json()
      setBookings(Array.isArray(data) ? data : [])
    } catch {
      setBookings([])
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id) {
    if (!confirm("Cancel this booking?")) return
    await fetch(`${API}/api/bookings/${id}`, { method: "DELETE" })
    setBookings(prev => prev.filter(b => b.id !== id))
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Bookings</h1>
        <Badge type="blue">{bookings.length} total</Badge>
      </div>

      <div className="admin-stats">
        <div className="admin-stat"><p>Total Bookings</p><h2>{bookings.length}</h2></div>
        <div className="admin-stat"><p>Paid</p>          <h2>{bookings.filter(b => b.payed).length}</h2></div>
        <div className="admin-stat"><p>Unpaid</p>        <h2>{bookings.filter(b => !b.payed).length}</h2></div>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-state">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="admin-state">No bookings yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th><th>User ID</th><th>Hotel ID</th><th>Payment</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={b.id ?? index}>
                  <td style={{ color: "var(--text-muted)" }}>{b.id ?? "-"}</td>
                  <td>{b.user_id}</td>
                  <td>{b.hotel_id}</td>
                  <td>
                    {b.payed
                      ? <Badge type="green">Paid</Badge>
                      : <Badge type="red">Unpaid</Badge>}
                  </td>
                  <td>
                    {b.id
                      ? <button className="tbl-btn tbl-del" onClick={() => handleDelete(b.id)}>Cancel</button>
                      : <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>No ID</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default function AdminPage() {
  const [tab, setTab] = useState("users")

  const tabs = [
    { key: "users",    label: "Users" },
    { key: "hotels",   label: "Hotels" },
    { key: "bookings", label: "Bookings" },
  ]

  return (
    <>
      <Nav />
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2>Admin Panel</h2>
          {tabs.map(t => (
            <button
              key={t.key}
              className={`admin-nav-btn ${tab === t.key ? "admin-active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </aside>

        <main className="admin-content">
          {tab === "users"    && <UsersTab />}
          {tab === "hotels"   && <HotelsTab />}
          {tab === "bookings" && <BookingsTab />}
        </main>
      </div>
    </>
  )
}