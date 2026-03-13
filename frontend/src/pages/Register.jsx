import { useState } from "react"
import API from "../services/api"
import { useNavigate, Link } from "react-router-dom"

function Register() {

  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const register = async () => {

    if(!name || !email || !password){
      alert("Please fill all fields")
      return
    }

    try{

      setLoading(true)

      await API.post("/auth/register",{
        name,
        email,
        password
      })

      alert("Account created successfully")

      navigate("/login")

    }catch(err){

      console.error(err)
      alert("Registration failed")

    }finally{

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">


      {/* LEFT SIDE / PRODUCT */}

      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white p-16">

        <h1 className="text-5xl font-bold mb-6">
          Shortify
        </h1>

        <p className="text-blue-100 text-lg max-w-md text-center">
          Build, manage and track your links with a modern URL shortener
          designed for speed and analytics.
        </p>

        <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-md">

          <p className="text-sm text-blue-100">
            Create short links, generate QR codes, and monitor clicks
            with a powerful analytics dashboard.
          </p>

        </div>

      </div>


      {/* RIGHT SIDE / REGISTER FORM */}

      <div className="flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl">

          <h2 className="text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Start managing your short links
          </p>


          {/* NAME */}

          <div className="mb-5">

            <label className="text-sm text-gray-600 mb-1 block">
              Name
            </label>

            <input
              placeholder="Your name"
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 w-full rounded-lg outline-none transition"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

          </div>


          {/* EMAIL */}

          <div className="mb-5">

            <label className="text-sm text-gray-600 mb-1 block">
              Email
            </label>

            <input
              placeholder="name@email.com"
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 w-full rounded-lg outline-none transition"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </div>


          {/* PASSWORD */}

          <div className="mb-6">

            <label className="text-sm text-gray-600 mb-1 block">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 w-full rounded-lg outline-none transition"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

          </div>


          {/* BUTTON */}

          <button
            onClick={register}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>


          {/* LOGIN LINK */}

          <p className="text-sm text-gray-500 text-center mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 ml-1 font-medium"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Register