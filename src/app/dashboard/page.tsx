"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
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

// Register Chart.js components
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

// Define types for the chart data structure
interface ChartResponseData {
  labels: string[];
  data: number[];
}

const Dashboard = () => {
  const [lineData, setLineData] = useState<ChartData<"line"> | null>(null);
  const [barData, setBarData] = useState<ChartData<"bar"> | null>(null);
  const [pieData, setPieData] = useState<ChartData<"pie"> | null>(null);
  // Add candlestick data if needed

  useEffect(() => {
    // Fetch line chart data
    axios
      .get<ChartResponseData>("http://127.0.0.1:8000/api/line/")
      .then((response) => {
        setLineData({
          labels: response.data.labels,
          datasets: [
            {
              label: "Line Chart",
              data: response.data.data,
              borderColor: "rgba(75,192,192,1)",
              fill: false,
            },
          ],
        });
      });

    // Fetch bar chart data
    axios
      .get<ChartResponseData>("http://127.0.0.1:8000/api/bar/")
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

    // Fetch pie chart data
    axios
      .get<ChartResponseData>("http://127.0.0.1:8000/api/pie/")
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
      <div className="flex justify-between">
        <div className="w-1/3">
          <h1>Dashboard</h1>
        </div>
        <div className="w-full ">
          <div className="flex justify-between">
            <div className="w-1/2">
              {/* Line Chart */}
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
            <div className="w-1/2">
              {/* Bar Chart */}
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
          </div>
          <div className="flex justify-between">
            <div>
              {/* Pie Chart */}
              {pieData && (
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                  }}
                />
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
