import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import Links from "./pages/Links"
import Analytics from './pages/Analytics'

function App(){

  return(

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/links"
          element={
            <ProtectedRoute>
                <Links/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
                <Analytics/>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App