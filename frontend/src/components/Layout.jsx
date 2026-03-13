import { Link, useLocation } from "react-router-dom"
import { FiHome, FiLink, FiBarChart2 } from "react-icons/fi"

function Layout({ children }) {

  const location = useLocation()

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome size={18}/> },
    { name: "My Links", path: "/links", icon: <FiLink size={18}/> },
    { name: "Analytics", path: "/analytics", icon: <FiBarChart2 size={18}/> }
  ]

  return (

    <div className="flex min-h-screen bg-slate-50">


      {/* SIDEBAR */}

      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">

        {/* LOGO */}

        <div className="h-16 flex items-center px-6 border-b">

          <Link
            to="/dashboard"
            className="text-2xl font-bold tracking-tight"
          >
            Workspace
          </Link>

        </div>


        {/* WORKSPACE */}

        <div className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
          Workspace
        </div>


        {/* MENU */}

        <nav className="flex flex-col gap-1 px-3">

          {menu.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
              
              ${
                location.pathname === item.path
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
              }`}
            >

              {item.icon}
              {item.name}

            </Link>

          ))}

        </nav>


        {/* FOOTER */}

        <div className="mt-auto p-6 text-xs text-gray-400">
          Shortify v1.0
        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="flex-1">

        <div className="p-10 max-w-6xl mx-auto">

          {children}

        </div>

      </main>

    </div>

  )

}

export default Layout