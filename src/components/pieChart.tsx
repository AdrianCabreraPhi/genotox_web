import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import * as genotoxApi from "../service/genotoxService";

function PieChart({ cas_rn }) {
  const [data, setData] = useState<any>(undefined);

  const getData = async () => {
    const formData = new FormData();
    formData.append("cas_rn", cas_rn);
    const response = await genotoxApi.getPieChartData(formData);

    const totals = response.data.pie_chart_data["overall_totals"];
    const labels = ["Conflicted", "Equivocal", "Negative", "Positive"];
    const values = labels.map((label) => totals[label] || 0);

    const max = Math.max(...values);
    const min = Math.min(...values);

    function interpolateColor(value, min, max, colorStart, colorEnd) {
      const fraction = (value - min) / (max - min);
      const start = colorStart.match(/\w\w/g).map((c) => parseInt(c, 16));
      const end = colorEnd.match(/\w\w/g).map((c) => parseInt(c, 16));
      const rgb = start.map((s, i) => Math.round(s + fraction * (end[i] - s)));
      return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }

    const colors = values.map((v, i) =>
      labels[i].toLowerCase().includes("negative")
        ? "red"
        : interpolateColor(v, min, max, "a7f3d0", "065f46")
    );
    const data = [
      {
        values: values,
        labels: labels,
        type: "pie",
        marker: { colors: colors },
        textinfo: "label+percent",
      },
    ];
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex h-1/2 items-center justify-center">
      {data && (
        <Plot
          data={data}
          layout={{
            width: 475,
            height: 475,
            font: {
              color: "green",
            },
          }}
        />
      )}
    </div>
  );
}

export default PieChart;
