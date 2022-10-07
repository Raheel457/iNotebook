import React from 'react'
import { Link } from 'react-router-dom'

export default function Main() {
  return (
    <>
        <div className="container">
            <h1>Welcome to iNotebook</h1>
            <>
                  <Link
                    to={`${localStorage.getItem('token') ? "/" : "/login"}`}
                    className="btn btn-primary mx-1"
                    role="button"
                    aria-pressed="true"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/signup"}
                    className="btn btn-primary mx-1"
                    role="button"
                  >
                    Sign Up
                  </Link>
                </>
        </div>
    </>
  )
}
