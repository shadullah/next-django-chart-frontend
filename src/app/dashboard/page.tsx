"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Bar, Line, Pie, Chart as ReactChartJs } from "react-chartjs-2";
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
  FinancialDataPoint,
  TimeScale,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  CandlestickController,
  CandlestickElement,
  TimeScale,
  Tooltip,
  Legend
);

interface candlestick {
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
  //   cts: number;
}

// chart response type defining
interface ChartResponse {
  labels: string[];
  data: number[];
}

const Dashboard = () => {
  const [lineData, setLineData] = useState<ChartData<"line"> | null>(null);
  const [barData, setBarData] = useState<ChartData<"bar"> | null>(null);
  const [pieData, setPieData] = useState<ChartData<"pie"> | null>(null);
  const [candleData, setCandleData] = useState<ChartData<
    "candlestick",
    FinancialDataPoint
  > | null>(null);

  useEffect(() => {
    try {
      axios
        .get<ChartResponse>("http://127.0.0.1:8000/api/line/")
        .then((res) => {
          //   console.log(res.data);
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

      axios.get<ChartResponse>("http://127.0.0.1:8000/api/bar/").then((res) => {
        setBarData({
          labels: res.data.labels,
          datasets: [
            {
              label: "Bar Chart",
              data: res.data.data,
              backgroundColor: ["rgba(34, 151, 153)", "rgba(66,66,66)"],
            },
          ],
        });
      });

      axios.get<ChartResponse>("http://127.0.0.1:8000/api/pie/").then((res) => {
        setPieData({
          labels: res.data.labels,
          datasets: [
            {
              label: "Pie Chart",
              data: res.data.data,
              backgroundColor: ["rgb(30, 32, 30)", "rgba(34, 151, 153)"],
            },
          ],
        });
      });

      axios
        .get<{ data: candlestick[] }>("http://127.0.0.1:8000/api/candle/")
        .then((res) => {
          console.log(res.data);

          // const candleArray = res.data;
          // console.log(candleArray);
          setCandleData({
            datasets: [
              {
                label: "Candlestick Chart",
                data: res.data.data.map((item) => ({
                  x: new Date(item.x).getTime(),
                  o: item.open,
                  h: item.high,
                  l: item.low,
                  c: item.close,
                  // cts: new Date(item.x).getTime(),
                })),
                borderColor: "rgba(66,66,66)",
              },
            ],
          });
        });
    } catch (error) {
      console.log(error);
    }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 p-2 md:p-6 h-auto md:h-screen">
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

            <div className="flex justify-center h-60 p-3">
              {pieData && (
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                  }}
                />
              )}
            </div>

            {/* candlestick chart  */}
            <div>
              {candleData && (
                <ReactChartJs
                  type="candlestick"
                  data={candleData}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        type: "time",
                        title: { display: true, text: "Time" },
                      },
                      y: {
                        title: { display: true, text: "Price" },
                      },
                    },
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
