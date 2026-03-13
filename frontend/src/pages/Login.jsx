import { useState } from "react"
import API from "../services/api"
import { useNavigate, Link } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const login = async () => {

    try {

      setLoading(true)

      const res = await API.post("/auth/login",{
        email,
        password
      })

      localStorage.setItem("token",res.data)

      navigate("/dashboard")

    } catch(err){

      alert("Invalid credentials")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">


      {/* LEFT SIDE / BRAND */}

      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white p-16">

        <h1 className="text-5xl font-bold mb-6">
          Shortify
        </h1>

        <p className="text-blue-100 text-lg max-w-md text-center">
          Create short links, track clicks, and manage your links
          with powerful analytics.
        </p>

        <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-md">

          <p className="text-sm text-blue-100">
            Modern link management platform built for speed and simplicity.
          </p>

        </div>

      </div>


      {/* RIGHT SIDE / FORM */}

      <div className="flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl">

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Login to manage your short links
          </p>


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
              placeholder="Enter your password"
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 w-full rounded-lg outline-none transition"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

          </div>


          {/* BUTTON */}

          <button
            onClick={login}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>


          {/* REGISTER */}

          <p className="text-sm text-gray-500 text-center mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 ml-1 font-medium"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  )
}

export default Login