import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"

function Navbar() {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [open,setOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200">

      <div className="w-full px-8 lg:px-16 py-4 flex justify-between items-center">

        {/* LOGO */}

        <Link to="/" className="flex items-center gap-2">

          {/* <img
            src="/src/assets/logo1.png"
            alt="Shortify"
            className="h-8 w-auto"
          /> */}

          <span className="font-bold text-lg tracking-tight">
            Shortify
          </span>

        </Link>


        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">

          <Link
            to="/"
            className="text-gray-600 hover:text-black transition"
          >
            Home
          </Link>

          {!token && (

            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-black transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </>

          )}

          {token && (

            <>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-black transition"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>

          )}

        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          className="md:hidden text-2xl"
          onClick={()=>setOpen(!open)}
        >
          {open ? <FiX/> : <FiMenu/>}
        </button>

      </div>


      {/* MOBILE MENU */}

      {open && (

        <div className="md:hidden border-t bg-white">

          <div className="flex flex-col gap-4 px-6 py-6 text-sm">

            <Link to="/" onClick={()=>setOpen(false)}>
              Home
            </Link>

            {!token && (

              <>
                <Link to="/login" onClick={()=>setOpen(false)}>
                  Login
                </Link>

                <Link to="/register" onClick={()=>setOpen(false)}>
                  Get Started
                </Link>
              </>

            )}

            {token && (

              <>
                <Link to="/dashboard" onClick={()=>setOpen(false)}>
                  Dashboard
                </Link>

                <button onClick={logout}>
                  Logout
                </button>
              </>

            )}

          </div>

        </div>

      )}

    </nav>

  )

}

export default Navbar