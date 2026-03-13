import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import API from "../services/api"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"

import { FiLink, FiMousePointer, FiTrendingUp } from "react-icons/fi"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function Analytics() {

  const [links, setLinks] = useState([])

  useEffect(() => {

    const load = async () => {

      const res = await API.get("/url/my-links")

      setLinks(res.data)

    }

    load()

  }, [])

  const totalClicks = links.reduce((sum, l) => sum + l.clickCount, 0)

  const bestLink =
    [...links].sort((a, b) => b.clickCount - a.clickCount)[0]

  const data = {

    labels: links.map(l => l.shortCode),

    datasets: [

      {

        label: "Clicks",

        data: links.map(l => l.clickCount),

        backgroundColor: "#3b82f6",

        borderRadius: 10,

        barThickness: 42

      }

    ]

  }

  const options = {

    responsive: true,

    plugins: {

      legend: { display: false },

      tooltip: {

        backgroundColor: "#111827",

        padding: 12,

        cornerRadius: 6

      }

    },

    scales: {

      x: {

        grid: { display: false },

        ticks: { color: "#6b7280" }

      },

      y: {

        beginAtZero: true,

        grid: { color: "#f1f5f9" },

        ticks: { color: "#6b7280", stepSize: 1 }

      }

    }

  }

  return (

    <Layout>

      <div className="space-y-10">

        {/* HEADER */}

        <div>

          <h1 className="text-3xl font-bold">
            Analytics
          </h1>

          <p className="text-gray-500">
            Insights and performance of your shortened links
          </p>

        </div>


        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg">

            <div className="flex justify-between">

              <div>

                <p className="text-sm opacity-80">
                  Total Links
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {links.length}
                </h2>

              </div>

              <FiLink size={28} />

            </div>

          </div>


          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg">

            <div className="flex justify-between">

              <div>

                <p className="text-sm opacity-80">
                  Total Clicks
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {totalClicks}
                </h2>

              </div>

              <FiMousePointer size={28} />

            </div>

          </div>


          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">

            <div className="flex justify-between">

              <div>

                <p className="text-sm opacity-80">
                  Best Link
                </p>

                <h2 className="text-lg font-semibold mt-2 truncate">
                  {bestLink?.shortCode || "N/A"}
                </h2>

              </div>

              <FiTrendingUp size={28} />

            </div>

          </div>

        </div>


        {/* CHART */}

        <div className="bg-white border rounded-xl shadow-lg p-8">

          <h2 className="text-xl font-semibold mb-6">
            Click Performance
          </h2>

          <Bar data={data} options={options} />

        </div>


        {/* TOP LINKS */}

        <div className="bg-white border rounded-xl shadow-lg p-8">

          <h2 className="text-xl font-semibold mb-6">
            Top Performing Links
          </h2>

          {links.length === 0 ? (

            <p className="text-gray-500">
              No analytics data yet
            </p>

          ) : (

            <div className="space-y-4">

              {[...links]
                .sort((a, b) => b.clickCount - a.clickCount)
                .slice(0, 5)
                .map(link => (

                  <div
                    key={link.id}
                    className="flex justify-between items-center border-b pb-3"
                  >

                    <div className="max-w-lg truncate text-gray-600">

                      {link.originalUrl}

                    </div>

                    <div className="flex items-center gap-4">

                      <span className="text-blue-600 font-medium">

                        {link.shortCode}

                      </span>

                      <span className="bg-blue-50 text-blue-600 px-3 py-1 text-xs rounded-full">

                        {link.clickCount} clicks

                      </span>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

      </div>

    </Layout>

  )

}

export default Analytics