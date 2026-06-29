import Nav from "../Nav"
import Footer from "../footer"
import * as React from "react";

function AiFillTrophy(props) {
  return <svg stroke="currentColor" fill="yellow" strokeWidth={0} viewBox="0 0 1024 1024" height="1em" width="1em" {...props}><path d="M868 160h-92v-40c0-4.4-3.6-8-8-8H256c-4.4 0-8 3.6-8 8v40h-92a44 44 0 0 0-44 44v148c0 81.7 60 149.6 138.2 162C265.6 630.2 359 721.8 476 734.5v105.2H280c-17.7 0-32 14.3-32 32V904c0 4.4 3.6 8 8 8h512c4.4 0 8-3.6 8-8v-32.3c0-17.7-14.3-32-32-32H548V734.5C665 721.8 758.4 630.2 773.8 514 852 501.6 912 433.7 912 352V204a44 44 0 0 0-44-44zM248 439.6c-37.1-11.9-64-46.7-64-87.6V232h64v207.6zM840 352c0 41-26.9 75.8-64 87.6V232h64v120z" /></svg>;
}

function BsLockFill(props) {
  return <svg stroke="currentColor" fill="yellow" strokeWidth={0} viewBox="0 0 16 16" height="1em" width="1em" {...props}><rect width={11} height={9} x={2.5} y={7} rx={2} /><path fillRule="evenodd" d="M4.5 4a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clipRule="evenodd" /></svg>;
}

function RiEarthFill(props) {
  return <svg stroke="currentColor" fill="blue" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" {...props}><g><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm6.355-6.048v-.105c0-.922 0-1.343-.652-1.716a7.374 7.374 0 0 0-.645-.325c-.367-.167-.61-.276-.938-.756a12.014 12.014 0 0 1-.116-.172c-.345-.525-.594-.903-1.542-.753-1.865.296-2.003.624-2.085 1.178l-.013.091c-.121.81-.143 1.082.195 1.437 1.265 1.327 2.023 2.284 2.253 2.844.112.273.4 1.1.202 1.918a8.185 8.185 0 0 0 3.151-2.237c.11-.374.19-.84.19-1.404zM12 3.833c-2.317 0-4.41.966-5.896 2.516.177.123.331.296.437.534.204.457.204.928.204 1.345 0 .328 0 .64.105.865.144.308.766.44 1.315.554.197.042.399.084.583.135.506.14.898.595 1.211.96.13.151.323.374.42.43.05-.036.211-.211.29-.498.062-.22.044-.414-.045-.52-.56-.66-.529-1.93-.356-2.399.272-.739 1.122-.684 1.744-.644.232.015.45.03.614.009.622-.078.814-1.025.949-1.21.292-.4 1.186-1.003 1.74-1.375A8.138 8.138 0 0 0 12 3.833z" /></g></svg>;
}

function MdTextsms(props) {
  return <svg stroke="black" fill="white" strokeWidth={1} viewBox="0 0 24 24" height="1em" width="1em" {...props}><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" /></svg>;
}

function BiRecycle(props) {
  return <svg stroke="currentColor" fill="green" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" {...props}><path d="M21.224 15.543l-.813-1.464-1.748.972.812 1.461c.048.085.082.173.104.264.021.082.028.164.025.251-.002.083-.016.166-.039.249-.023.079-.057.157-.104.235-.041.072-.092.138-.152.198-.061.061-.126.113-.195.154-.075.044-.151.077-.237.101S18.697 18 18.601 18H14v-2l-4 3 4 3v-2h4.601c.278 0 .552-.037.811-.109.253-.07.495-.173.722-.308.216-.128.418-.286.597-.468.178-.179.332-.38.456-.593.128-.217.229-.449.298-.688.071-.246.111-.498.118-.745.01-.263-.018-.528-.08-.782C21.459 16.046 21.359 15.79 21.224 15.543zM5.862 11.039l-2.31 4.62c-.121.242-.208.496-.261.755-.052.255-.069.514-.053.763.015.25.062.498.137.732.075.236.18.461.308.666.13.211.284.404.459.574.178.174.376.326.595.453.224.128.462.227.705.293C5.698 19.965 5.966 20 6.236 20H8v-2H6.236c-.094 0-.184-.012-.271-.035-.08-.022-.156-.054-.229-.095-.07-.041-.137-.091-.197-.151-.059-.057-.109-.122-.156-.198-.043-.068-.077-.142-.104-.224-.024-.078-.04-.157-.045-.244-.005-.079.001-.162.018-.245.018-.087.048-.173.089-.256l2.256-4.512 1.599.923L8.598 8 4 9.964 5.862 11.039zM18.598 12.964L19.196 8l-1.638.945-2.843-5.117c-.141-.253-.314-.483-.518-.685-.195-.193-.417-.358-.658-.49-.233-.128-.483-.224-.737-.284-.252-.061-.512-.084-.772-.083-.261.005-.521.044-.773.117-.256.073-.499.18-.725.316-.234.143-.449.317-.636.52C9.703 3.448 9.539 3.686 9.41 3.944L8.678 5.408l1.789.895.732-1.465c.045-.09.101-.171.166-.242.06-.064.128-.121.204-.166.073-.045.154-.08.239-.104s.173-.038.264-.04c.09-.001.178.007.266.029.084.02.165.051.243.094.077.042.148.095.21.156.068.068.128.147.177.235l2.858 5.146L14 11 18.598 12.964z" /></svg>;
}


function BsLightningFill(props) {
  return <svg stroke="currentColor" fill="yellow" strokeWidth={0} viewBox="0 0 16 16" height="1em" width="1em" {...props}><path fillRule="evenodd" d="M11.251.068a.5.5 0 01.227.58L9.677 6.5H13a.5.5 0 01.364.843l-8 8.5a.5.5 0 01-.842-.49L6.323 9.5H3a.5.5 0 01-.364-.843l8-8.5a.5.5 0 01.615-.09z" clipRule="evenodd" /></svg>;
}

const values = [
  { id: 1, icon: AiFillTrophy(), title: "Excellence",    description: "We partner only with hotels that meet our strict quality standards so every stay exceeds expectations." },
  { id: 2, icon: BsLockFill(), title: "Trust",         description: "Your bookings are protected. Secure payments, transparent pricing — no hidden fees, ever." },
  { id: 3, icon: RiEarthFill(), title: "Diversity",     description: "From boutique guesthouses to 5-star resorts across 120+ destinations worldwide." },
  { id: 4, icon: MdTextsms(), title: "Support",       description: "Our customer care team is available 7 days a week to assist you before, during, and after your stay." },
  { id: 5, icon: BiRecycle(), title: "Sustainability", description: "We actively promote eco-friendly hotels and green travel practices across our platform." },
  { id: 6, icon: BsLightningFill(), title: "Speed",         description: "Find, compare, and book your perfect hotel in under 2 minutes — no back-and-forth required." },
]

const team = [
  { id: 1, initials: "AK", name: "Adam Karim",    role: "Founder & CEO"         },
  { id: 2, initials: "SB", name: "Sara Benali",   role: "Head of Partnerships"  },
  { id: 3, initials: "YM", name: "Youssef Mirza", role: "Lead Engineer"         },
  { id: 4, initials: "LH", name: "Lina Haddad",  role: "UX & Design Lead"      },
  { id: 5, initials: "NF", name: "Nour Fassi",    role: "Marketing Director"    },
]

export default function About() {
  return (
    <>
      <Nav />

      
      <section className="about-hero">
        <h1>About BookerS</h1>
        <p>
          We're on a mission to make hotel booking simple, transparent, and
          enjoyable for every traveller — wherever their journey takes them.
        </p>
      </section>

      
      <div className="stats-row">
        <div className="stat-item"><h2>500+</h2><p>Hotels Listed</p></div>
        <div className="stat-item"><h2>120+</h2><p>Destinations</p></div>
        <div className="stat-item"><h2>50k+</h2><p>Happy Guests</p></div>
        <div className="stat-item"><h2>2018</h2><p>Year Founded</p></div>
      </div>

      
      <section>
        <div className="contact-layout">
          <div className="contact-info">
            <h2>Our Story</h2>
            <p>
              BookerS was born out of frustration. Our founders spent hours
              jumping between travel sites, comparing prices, reading through
              vague descriptions, and still ended up in disappointing rooms.
            </p>
            <p style={{ marginTop: "14px" }}>
              In 2018 we set out to build something better — a platform that
              puts honest information, real guest reviews, and fair prices front
              and centre so travellers can book with confidence in minutes, not
              hours.
            </p>
            <p style={{ marginTop: "14px" }}>
              Today, BookerS connects thousands of guests with handpicked hotels
              across 120+ destinations. Every property on our platform is
              verified, reviewed, and held to the high standards our guests
              deserve.
            </p>
          </div>

          <div style={{
            background: "linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)",
            borderRadius: "var(--radius-lg)",
            padding: "48px 36px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px"
          }}>
            <div style={{ fontSize: "3rem" }}>🌟</div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff" }}>
              Our Mission
            </h2>
            <p style={{ color: "rgba(255,255,255,.85)", lineHeight: 1.8 }}>
              To make every traveller feel at home — anywhere in the world —
              by connecting them with hotels that match their style, budget,
              and expectations. No surprises. No compromise.
            </p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,.2)", paddingTop: "20px" }}>
              <p style={{ color: "rgba(255,255,255,.7)", fontSize: "0.875rem" }}>
                ✅ &nbsp;Verified hotels only<br />
                ✅ &nbsp;Real guest reviews<br />
                ✅ &nbsp;Transparent pricing<br />
                ✅ &nbsp;24/7 support
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section style={{ background: "var(--bg)" }}>
        <div className="section-heading">
          <h2>What We Stand For</h2>
          <p>Six principles that guide every decision we make at BookerS.</p>
        </div>
        <div className="values-grid">
          {values.map((v) => (
            <div key={v.id} className="value-card">
              <div className="icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section>
        <div className="section-heading">
          <h2>Meet the Team</h2>
          <p>The people behind BookerS who work every day to improve your travel experience.</p>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <div key={member.id} className="team-card">
              <div className="avatar">{member.initials}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <h1>Ready to Book Your Next Stay?</h1>
        <p>Join over 50,000 happy guests who trust BookerS for every trip.</p>
        <a href="/all" className="btn btn-white">Browse Hotels</a>
      </section>

      <Footer />
    </>
  )
}