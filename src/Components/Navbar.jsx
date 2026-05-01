import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

export default function Navbar() {

  let [q, setQ] = useState("")
  let [language, setLanguage] = useState("")
  let [searchParams] = useSearchParams()
  let navigate = useNavigate()

  useEffect(() => {
    setQ(searchParams.get("q") ?? "cricket")
    setLanguage(searchParams.get("language") ?? "en")
  }, [searchParams])

  function handleSearch(e) {
    e.preventDefault()
    let query = q.trim() || "cricket"
    navigate(`/?q=${query}&language=${language}`)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/">
          NEWS-APP
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={`/?q=politics&language=${language}`}>POLITICS</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={`/?q=business&language=${language}`}>BUSINESS</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={`/?q=technology&language=${language}`}>TECHNOLOGY</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={`/?q=science&language=${language}`}>SCIENCE</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={`/?q=sports&language=${language}`}>SPORTS</Link>
            </li>

            {/* Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                More
              </a>
              <ul className="dropdown-menu dropdown-modern">
                <li><Link className="dropdown-item" to={`/?q=entertainment&language=${language}`}>Entertainment</Link></li>
                <li><Link className="dropdown-item" to={`/?q=health&language=${language}`}>Health</Link></li>
                <li><Link className="dropdown-item" to={`/?q=world&language=${language}`}>World</Link></li>
              </ul>
            </li>

            {/* Languages */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Languages
              </a>
              <ul className="dropdown-menu dropdown-modern">
                <li><Link className="dropdown-item" to={`/?q=${q}&language=en`}>English</Link></li>
                <li><Link className="dropdown-item" to={`/?q=${q}&language=fr`}>French</Link></li>
                <li><Link className="dropdown-item" to={`/?q=${q}&language=de`}>German</Link></li>
                <li><Link className="dropdown-item" to={`/?q=${q}&language=es`}>Spanish</Link></li>
                <li><Link className="dropdown-item" to={`/?q=${q}&language=ru`}>Russian</Link></li>
              </ul>
            </li>

          </ul>

          {/* 🔍 Search */}
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="Search news..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="btn search-btn" type="submit">
              Search
            </button>
          </form>

        </div>
      </div>
    </nav>
  )
}