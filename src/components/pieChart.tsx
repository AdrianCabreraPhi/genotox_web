import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import * as genotoxApi from "../service/genotoxService";
import { motion } from "framer-motion";
function PieChart({ cas_rn,setOption,setSelectedDatabase }) {
  const [data, setData] = useState<any>(undefined);
  const [databasesUI, setDatabasesUI] = useState(null);
  const formatData = (labels, data) => {
    const result = {
      Negative: [],
      Positive: [],
      Conflicted: [],
      Equivocal: [],
    };

    for (const key of Object.keys(data)) {
      for (const value of Object.keys(data[key])) {
        if (data[key][value] > 0 && result.hasOwnProperty(value)) {
          result[value].push(key);
        }
      }
    }
    return result;
  };

  const getData = async () => {
    const formData = new FormData();
    formData.append("cas_rn", cas_rn);
    const response = await genotoxApi.getPieChartData(formData);
    const totals = response.data.pie_chart_data["overall_totals"];
    const labels = ["Conflicted", "Equivocal", "Negative", "Positive"];
    const values = labels.map((label) => totals[label] || 0);
    const databases = formatData(
      labels,
      response.data.pie_chart_data.databases
    );
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
        textinfo: "label+percent<br>",
        databases: databases,
      },
    ];
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const loadDatabase = (database)=> {
 
    setSelectedDatabase(database)
    setOption("database")


  }

  const generateDatabaseButtons = (databases) => {
   
    return (
      // event para mandar el cambio de option a database y mostrar el database seleccionado , cargar visualizeddata, entonces pasarle setOption al pieChart
      <div className=" flex flex-wrap px-1 gap-2">
        {databases.map((database, i) => (
          <button
            key={i}
            onClick={() =>  loadDatabase(database) }
            className="text-gray-500 hover:shadow-green-900/30 min-w-44 transition-all duration-300 ease-in-out rounded hover:text-black  shadow-md  p-1 transform hover:-translate-y-1"
          >
            {database}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
    <motion.div initial={{opacity:0}}   transition={{ duration: 1,delay:0.1 }} animate={{opacity:1}}  className="  max-w-lg mx-auto">
      {data && (
        <Plot
          onClick={(e) =>
            setDatabasesUI(
              generateDatabaseButtons(
                e.points[0].data.databases[e.points[0].label]
              )
            )
          }
          data={data}
          layout={{ autosize: true, font: { color: "green" } }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          className="cursor-pointer"
        />
      )}
      <div className="text-center text-sm  antialiased m-2">
        <span className="bg-neutral-50  p-1 rounded-md   border border-neutral-100">
          Click chart to see databases
        </span>
      </div>
    </motion.div>
       {databasesUI}
    </>
  );
}

export default PieChart;
