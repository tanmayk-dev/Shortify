import { useEffect, useState } from "react"
import API from "../services/api"
import Layout from "../components/Layout"
import toast from "react-hot-toast"
import { FiCopy, FiExternalLink } from "react-icons/fi"

function MyLinks(){

  const [links,setLinks] = useState([])
  const [search,setSearch] = useState("")

  const loadLinks = async ()=>{

    try{

      const res = await API.get("/url/my-links")

      setLinks(res.data)

    }catch{

      console.error("Failed loading links")

    }

  }

  useEffect(()=>{

    loadLinks()

  },[])


  const copyLink = (link)=>{

    navigator.clipboard.writeText(link)

    toast.success("Link copied")

  }

  return(

    <Layout>

      <div className="space-y-6">

        {/* PAGE HEADER */}

        <div>

          <h1 className="text-3xl font-bold">
            My Links
          </h1>

          <p className="text-gray-500">
            View and manage all your shortened URLs
          </p>

        </div>


        {/* SEARCH */}

        <div className="flex justify-end">

          <input
            type="text"
            placeholder="Search links..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>


        {/* LINKS TABLE */}

        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

          {links.length === 0 ? (

            <div className="p-12 text-center text-gray-500">
              No links created yet
            </div>

          ) : (

            <table className="w-full text-sm">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="px-6 py-3 text-left">
                    Original URL
                  </th>

                  <th className="px-6 py-3 text-left">
                    Short Link
                  </th>

                  <th className="px-6 py-3 text-center">
                    Clicks
                  </th>

                  <th className="px-6 py-3 text-right">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {links
                .filter(link=>
                  link.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
                  link.shortCode.toLowerCase().includes(search.toLowerCase())
                )
                .map(link=>{

                  const shortLink = `http://localhost:8081/${link.shortCode}`

                  return(

                    <tr
                      key={link.id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                        {link.originalUrl}
                      </td>


                      <td className="px-6 py-4 text-blue-600 font-medium">
                        {shortLink}
                      </td>


                      <td className="px-6 py-4 text-center">

                        <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">

                          {link.clickCount}

                        </span>

                      </td>


                      <td className="px-6 py-4 text-right">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={()=>copyLink(shortLink)}
                            className="flex items-center gap-1 border px-3 py-1.5 rounded text-xs hover:bg-gray-100"
                          >
                            <FiCopy size={14}/>
                            Copy
                          </button>


                          <a
                            href={shortLink}
                            target="_blank"
                            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700"
                          >
                            <FiExternalLink size={14}/>
                            Open
                          </a>

                        </div>

                      </td>

                    </tr>

                  )

                })}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </Layout>

  )

}

export default MyLinks