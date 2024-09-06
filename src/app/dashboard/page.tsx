"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  Tooltip,
  Legend
);

// chart response type defining
interface ChartResponse {
  labels: string[];
  data: number[];
}

const Dashboard = () => {
  const [lineData, setLineData] = useState<ChartData<"line"> | null>(null);
  const [barData, setBarData] = useState<ChartData<"bar"> | null>(null);
  const [pieData, setPieData] = useState<ChartData<"pie"> | null>(null);
  // Add candlestick data if needed

  useEffect(() => {
    axios.get<ChartResponse>("http://127.0.0.1:8000/api/line/").then((res) => {
      console.log(res.data);
      setLineData({
        labels: res.data.labels,
        datasets: [
          {
            label: "Line Chart",
            data: res.data.data,
            borderColor: "rgb(75, 192, 192)",
          },
        ],
      });
    });

    axios
      .get<ChartResponse>("http://127.0.0.1:8000/api/bar/")
      .then((response) => {
        setBarData({
          labels: response.data.labels,
          datasets: [
            {
              label: "Bar Chart",
              data: response.data.data,
              backgroundColor: [
                "rgba(75,192,192,0.4)",
                "rgba(153,102,255,0.6)",
              ],
            },
          ],
        });
      });

    axios
      .get<ChartResponse>("http://127.0.0.1:8000/api/pie/")
      .then((response) => {
        setPieData({
          labels: response.data.labels,
          datasets: [
            {
              label: "Pie Chart",
              data: response.data.data,
              backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"],
            },
          ],
        });
      });
  }, []);

  return (
    <div>
      <div className="block md:flex justify-between">
        <div className="w-full md:w-1/4 bg-gray-900 md:h-screen p-3">
          <h1 className="text-xl md:text-3xl my-3 font-bold">Dashboard</h1>
          <Link href="/">
            <button className="w-full text-sm bg-gray-600 px-2 md:px-3 font-bold py-1 md:py-2 rounded-lg">
              Home
            </button>
          </Link>
        </div>
        <div className="w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 p-2 md:p-6 md:h-screen">
            {/* Line Chart */}

            <div className="">
              {lineData && (
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    scales: {
                      x: { title: { display: true, text: "Date" } },
                      y: { title: { display: true, text: "Value" } },
                    },
                  }}
                />
              )}
            </div>

            {/* Bar Chart */}

            <div className="">
              {barData && (
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    scales: {
                      x: { title: { display: true, text: "Categories" } },
                      y: { title: { display: true, text: "Values" } },
                    },
                  }}
                />
              )}
            </div>

            {/* Pie Chart */}

            <div className="flex justify-center">
              {pieData && (
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
