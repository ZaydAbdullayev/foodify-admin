import React from "react";
import "./statistics.css";
import { Tooltip as Tt } from "antd";
import { useNavigate } from "react-router-dom";
import AnimatedNumber from "animated-number-react";
import { CalculateTotalQuantity } from "../../service/calc.service";
// import { create, LineSeries, XYChart } from "@amcharts/amcharts5-react";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { ResponsiveContainer, CartesianGrid } from "recharts";

export const DonutChart = ({ data, billsData, short, hint, tl = null, ty }) => {
  const [activeI, setActiveI] = React.useState(null);
  const navigate = useNavigate();
  const df_Pie = data?.every((p) => p?.[hint] === 0)
    ? [{ type: "Malumot yo'q", cl: "#333", amount: 0 }]
    : data?.filter((p) => p?.[hint] > 0);

  const total = CalculateTotalQuantity(data, hint) || 1;
  const totalp = CalculateTotalQuantity(df_Pie, hint) || data?.[0]?.[hint];
  const formatValue = (value) => {
    return value
      .toFixed(0)
      ?.toString()
      ?.replace(/\d(?=(\d{3})+$)/g, "$&,");
  };

  const drs = [
    "right",
    "left",
    "bottom",
    "rightTop",
    "leftTop",
    "rightBottom",
    "bottomLeft",
    "bottomRight",
    "leftBottom",
  ];

  return (
    <div className="donut-chart-container">
      <svg
        className={`donut-chart` + (df_Pie?.length === 1 && " once")}
        width="400"
        height="400"
        style={{ background: df_Pie?.length === 1 ? df_Pie[0]?.cl : "" }}>
        {df_Pie?.map((slice, index) => {
          const startAngle =
            index === 0
              ? 0
              : df_Pie
                  .slice(0, index)
                  .reduce((acc, curr) => acc + (curr?.[hint] / total) * 360, 0);
          const endAngle =
            startAngle + ((slice?.[hint] || 0) / (total || 1)) * 360;

          const formatValue = (value) => {
            if (typeof value === "number") {
              return value?.toString()?.replace(/\d(?=(\d{3})+$)/g, "$& ");
            }
            return value;
          };

          return (
            <Tt
              title={`${slice?.[ty]} - ${formatValue(slice?.[hint])}`}
              color={slice?.cl}
              key={`${slice?.cl}_${index}`}
              placement={drs?.[index]}>
              <g
                className={`${
                  activeI !== index && activeI !== null ? "passive" : "active"
                }`}>
                <path
                  d={`
                    M 200,200
                    L ${
                      200 + Math.cos(((startAngle - 90) * Math.PI) / 180) * 150
                    },${
                    200 + Math.sin(((startAngle - 90) * Math.PI) / 180) * 150
                  }
                    A 150,150 0 ${slice?.[hint] / total > 0.5 ? 1 : 0},1 ${
                    200 + Math.cos(((endAngle - 90) * Math.PI) / 180) * 150
                  },${200 + Math.sin(((endAngle - 90) * Math.PI) / 180) * 150}
                    Z
                  `}
                  fill={slice?.cl}
                  onClick={() => setActiveI(activeI === index ? null : index)}
                />
              </g>
            </Tt>
          );
        })}
      </svg>
      <label
        className="df aic jcc flc"
        onClick={() => {
          navigate("/bills-report");
          setActiveI(null);
        }}>
        {!short && (
          <span>
            🧾{" "}
            <AnimatedNumber
              value={billsData?.length}
              formatValue={formatValue}
            />
            ta
          </span>
        )}
        <small>
          💵 <AnimatedNumber value={totalp} formatValue={formatValue} />
        </small>
      </label>
    </div>
  );
};

export const LineChartC = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={500}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#aaa5" />
        <XAxis dataKey="date" fontSize={14} />
        <YAxis />
        <Tooltip
          labelFormatter={(value) => {
            return `🕒 ${value}`;
          }}
          labelStyle={{
            fontSize: "12px",
          }}
          contentStyle={{
            fontSize: "12px",
          }}
        />
        <Line
          type="monotone"
          dataKey="incomes"
          stroke="#80ed99"
          strokeWidth={2}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="other_incomes"
          stroke="#c1121f"
          strokeWidth={2}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// const LineChart = () => {
//   useEffect(() => {
//     // Chart'u oluştur
//     const chart = create("chartDiv", XYChart);

//     // Veri seti oluştur
//     const data = [
//       { date: new Date(2024, 0, 1), value: 100 },
//       { date: new Date(2024, 0, 2), value: 120 },
//       { date: new Date(2024, 0, 3), value: 130 },
//       // Diğer verileri buraya ekle
//     ];

//     // Seriyi oluştur
//     const series = chart.addSeries(LineSeries);
//     series.data.setAll(data);

//     // Eksenleri yapılandır
//     const xAxis = chart.xAxes.push({ type: "DateAxis" });
//     const yAxis = chart.yAxes.push({ type: "ValueAxis" });

//     // Sayfa kaldırıldığında temizleme
//     return () => {
//       chart.dispose();
//     };
//   }, []);

//   return <div id="chartDiv" style={{ width: "100%", height: "500px" }} />;
// };

// export default LineChart;
