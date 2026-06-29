"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function ProfileButton() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>

      <button onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', borderRadius: '50%', width: 40, height: 40, border: 'none', background: '#3266ad', color: 'white', fontWeight: 'bold', fontSize: 16 }}>
        {localStorage.getItem("username").charAt(0).toUpperCase()}
      </button>
      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 48,
          background: 'white', border: '1px solid #eee',
          borderRadius: 10, width: 200, boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          zIndex: 100
        }}>

          
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 14 }}>{localStorage.getItem("username")}</p>
          </div>

          
          <div style={{ padding: '8px 0' }}>
            <Link href="/settings" onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '10px 16px', color: '#333', textDecoration: 'none', fontSize: 14 }}>
              Paramètres
            </Link>
            <button onClick={() => { setOpen(false); localStorage.clear();window.location.reload();}}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'none', color: 'red', fontSize: 14, cursor: 'pointer' }}>
              Déconnexion
            </button>
          </div>

        </div>
      )}

      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
      )}

    </div>
  )
}