import { useState } from "react"
import API from "../services/api"
import { QRCodeSVG } from "qrcode.react"

function Landing() {

  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const shorten = async () => {

    if (!url) return

    try {

      setLoading(true)

      const res = await API.post("/url/shorten", {
        originalUrl: url
      })

      setShortUrl(res.data)

    } catch (err) {

      alert("Failed to shorten URL")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="bg-slate-50 text-slate-800">


      {/* HERO */}

      <section className="relative overflow-hidden">

        {/* background gradient */}

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600"></div>

        {/* glow blobs */}

        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 opacity-30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-blue-400 opacity-30 blur-3xl rounded-full"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center text-white">

          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Shortify - <br />
            URL Shortener
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-12">
            Create short links instantly, track clicks in real time,
            and share links with QR codes. Built for speed and analytics.
          </p>


          {/* SHORTENER CARD */}

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 max-w-2xl mx-auto shadow-2xl">

            <div className="flex gap-4">

              <input
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none"
              />

              <button
                onClick={shorten}
                className="bg-white text-blue-600 px-6 rounded-lg font-semibold hover:scale-105 transition"
              >
                {loading ? "Shortening..." : "Shorten"}
              </button>

            </div>

            {shortUrl && (

              <div className="mt-6 flex flex-col items-center gap-4">

                <p className="text-green-300 font-medium">
                  {shortUrl}
                </p>

                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG value={shortUrl} size={120} />
                </div>

              </div>

            )}

          </div>

        </div>

      </section>



      {/* FEATURES */}

      <section className="py-28">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Everything you need
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition">

              <div className="text-4xl mb-4">⚡</div>

              <h3 className="text-xl font-semibold mb-3">
                Instant Links
              </h3>

              <p className="text-gray-600">
                Create short links instantly with optional custom aliases.
              </p>

            </div>


            <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition">

              <div className="text-4xl mb-4">📊</div>

              <h3 className="text-xl font-semibold mb-3">
                Click Analytics
              </h3>

              <p className="text-gray-600">
                Track link clicks and performance with a clean dashboard.
              </p>

            </div>


            <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition">

              <div className="text-4xl mb-4">🔗</div>

              <h3 className="text-xl font-semibold mb-3">
                QR Sharing
              </h3>

              <p className="text-gray-600">
                Instantly generate QR codes for easy sharing anywhere.
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* PRODUCT PREVIEW */}

      <section className="bg-white py-28">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-4xl font-bold mb-6">
              Powerful analytics dashboard
            </h2>

            <p className="text-gray-600 mb-6">
              Track link clicks, identify top performing links,
              and monitor engagement from one place.
            </p>

            <ul className="space-y-3 text-gray-600">

              <li>✔ Real-time click tracking</li>
              <li>✔ Top performing links</li>
              <li>✔ Visual analytics charts</li>

            </ul>

          </div>

          <div className="bg-slate-100 rounded-xl h-64 shadow-inner flex items-center justify-center text-gray-400">

              {/* Replace with actual dashboard screenshot */}
              <img
                src="src/assets/dashboard.png"
                alt="Dashboard Preview"
                className="rounded-lg shadow"
              />

          </div>

        </div>

      </section>



      {/* CTA */}

      <section className="py-24 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">

        <h2 className="text-4xl font-bold mb-6">
          Start shortening links today
        </h2>

        <p className="mb-8 text-blue-100">
          Create an account and manage all your links easily.
        </p>

        <a
          href="/register"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Get Started
        </a>

      </section>



      {/* FOOTER */}

      <footer className="bg-slate-900 text-gray-400 py-8 text-center">

        <p>
          © {new Date().getFullYear()} Shortify — Built for modern link management
        </p>

      </footer>


    </div>

  )

}

export default Landing