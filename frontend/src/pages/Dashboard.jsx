import { useState, useEffect } from "react"
import API from "../services/api"
import { QRCodeSVG } from "qrcode.react"
import toast from "react-hot-toast"
import Layout from "../components/Layout"
import { FiLink, FiMousePointer, FiTrendingUp } from "react-icons/fi"

function Dashboard() {

  const [url,setUrl] = useState("")
  const [alias,setAlias] = useState("")
  const [shortUrl,setShortUrl] = useState("")
  const [links,setLinks] = useState([])
  const [search,setSearch] = useState("")
  const [deleteId,setDeleteId] = useState(null)

  useEffect(()=>{ loadLinks() },[])

  const loadLinks = async ()=>{
    try{
      const res = await API.get("/url/my-links")
      setLinks(res.data)
    }catch{
      console.error("Failed loading links")
    }
  }

  const shorten = async ()=>{

    if(!url) return

    try{

      const res = await API.post("/url/shorten",{
        originalUrl:url,
        customAlias:alias
      })

      setShortUrl(res.data)
      loadLinks()

      setUrl("")
      setAlias("")

      toast.success("Short link created")

    }catch{
      toast.error("Failed to shorten URL")
    }

  }

  const copyLink = (link)=>{
    navigator.clipboard.writeText(link)
    toast.success("Copied")
  }

  const deleteLink = async(id)=>{
    await API.delete(`/url/${id}`)
    loadLinks()
  }

  const totalClicks = links.reduce((sum,l)=>sum+l.clickCount,0)

  return (

    <Layout>

      <div className="space-y-10">

        {/* HEADER */}

        <div>

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500">
            Manage and track your shortened links
          </p>

        </div>


        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm opacity-80">
                  Total Links
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {links.length}
                </h2>

              </div>

              <FiLink size={28}/>

            </div>

          </div>


          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm opacity-80">
                  Total Clicks
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {totalClicks}
                </h2>

              </div>

              <FiMousePointer size={28}/>

            </div>

          </div>


          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl p-6 shadow-lg">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm opacity-80">
                  Top Link
                </p>

                <h2 className="text-lg font-semibold mt-2 truncate">
                  {links[0]?.shortCode || "No links"}
                </h2>

              </div>

              <FiTrendingUp size={28}/>

            </div>

          </div>

        </div>


        {/* CREATE LINK */}

        <div className="bg-white rounded-xl shadow-lg border p-8">

          <h2 className="text-xl font-semibold mb-6">
            Create Short Link
          </h2>

          <div className="flex gap-4">

            <input
              placeholder="Paste URL"
              value={url}
              onChange={(e)=>setUrl(e.target.value)}
              className="border rounded-lg px-4 py-3 flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              placeholder="Alias"
              value={alias}
              onChange={(e)=>setAlias(e.target.value)}
              className="border rounded-lg px-4 py-3 w-52"
            />

            <button
              onClick={shorten}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-medium"
            >
              Shorten
            </button>

          </div>

        </div>


        {/* RESULT */}

        {shortUrl && (

          <div className="bg-white rounded-xl shadow-lg border p-8 flex gap-8 items-center">

            <QRCodeSVG value={shortUrl} size={140}/>

            <div className="space-y-4">

              <p className="text-blue-600 font-medium">
                {shortUrl}
              </p>

              <div className="flex gap-3">

                <button
                  onClick={()=>copyLink(shortUrl)}
                  className="border px-4 py-2 rounded-md text-sm"
                >
                  Copy
                </button>

                <a
                  href={shortUrl}
                  target="_blank"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Open
                </a>

              </div>

            </div>

          </div>

        )}


        {/* LINKS */}

        <div className="space-y-4">

          <div className="flex justify-between items-center">

            <h2 className="text-xl font-semibold">
              Your Links
            </h2>

            <input
              placeholder="Search links..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm"
            />

          </div>


          <div className="bg-white rounded-xl shadow-lg border overflow-hidden">

            {links.length===0 ? (

              <div className="p-10 text-center text-gray-500">
                No links yet
              </div>

            ):(

              <table className="w-full text-sm">

                <thead className="bg-gray-50 border-b">

                  <tr>

                    <th className="px-6 py-3 text-left">
                      Original URL
                    </th>

                    <th className="px-6 py-3 text-left">
                      Short Link
                    </th>

                    <th className="px-6 py-3">
                      Clicks
                    </th>

                    <th className="px-6 py-3 text-right">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {links
                  .filter((link)=>
                    link.originalUrl.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(link=>{

                    const shortLink = link.shortUrl || `http://localhost:8081/${link.shortCode}`

                    return(

                      <tr key={link.id} className="border-b hover:bg-gray-50">

                        <td className="px-6 py-4 max-w-xs truncate text-gray-600">
                          {link.originalUrl}
                        </td>

                        <td className="px-6 py-4 text-blue-600">
                          {shortLink}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {link.clickCount}
                        </td>

                        <td className="px-6 py-4 text-right">

                          <div className="flex justify-end gap-2">

                            <button
                              onClick={()=>copyLink(shortLink)}
                              className="border px-3 py-1 rounded text-xs"
                            >
                              Copy
                            </button>

                            <a
                              href={shortLink}
                              target="_blank"
                              className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                            >
                              Open
                            </a>

                            <button
                              onClick={()=>setDeleteId(link.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                            >
                              Delete
                            </button>

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

      </div>

    </Layout>

  )

}

export default Dashboard