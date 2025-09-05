import "./App.css";
import Header from "./components/Header";
import FormDataQuery from "./components/FormData";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import * as genotoxApi from "./service/genotoxService";
import { toast } from "react-toastify";
import VisualizeData from "./components/VisualizeData";
import saveBlobAsExcel from "./utils/saveBlobAsExcel";
import PieChart from "./components/pieChart";
import { AnimatePresence, motion } from "framer-motion";
import ModalInformationDatabase from "./components/ModalInformationDatabase";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

function App() {
  const [cas_rn, setCASRN] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [, setProgressQuery] = useState<number>(0);
  const [result, setResult] = useState<object | boolean>(false);
  const [hoverEffectDatabases, setHoverEffectDatabases] = useState<object>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedDatabase, setSelectedDatabase] = useState<string | undefined>(
    undefined
  );

  const handleChangeDatabase = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDatabase(event.target.value);
  };

  const onChangeInputcasrn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCASRN(event.target.value);
  };

  // Form
  const submit = async () => {
    setLoading(true);
    setResult(false);
    let siguePidiendoProgreso = true;

    const toastId = toast.loading("Processing data 0%");

    async function sondearProgreso() {
      if (!siguePidiendoProgreso) return;

      const resultado = await genotoxApi.queryProgress(cas_rn);
      const progress = Number(resultado.data.progress);

      setProgressQuery(progress);
      toast.update(toastId, { render: `Processing data ${progress}%` });

      if (progress < 100) {
        setTimeout(sondearProgreso, 1000);
      }
    }

    async function iniciarProceso() {
      const formData = new FormData();
      formData.append("cas_rn", cas_rn);
      formData.append("details", showDetails.toString());

      try {
        setTimeout(sondearProgreso, 500);

        const result = await genotoxApi.query(formData);

        if (!result.data.download_ready) {
          toast.update(toastId, {
            render: result.data.error,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          siguePidiendoProgreso = false;
          setLoading(false);
          return;
        }

        siguePidiendoProgreso = false;

        toast.update(toastId, {
          render: "Successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setProgressQuery(100);
        console.log("VER QUE TIPO:");
        console.log(result.data.data);
        setResult(result.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        siguePidiendoProgreso = false;
        setLoading(false);

        toast.update(toastId, {
          render: "Error",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }

    iniciarProceso();
  };

  const downloadData = async () => {
    const formData = { cas_rn: cas_rn, data: result };
    const response = await genotoxApi.downloadData(formData);
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveBlobAsExcel(blob, `gt_result_${cas_rn}.xlsx`);
  };

  return (
    <>
      <div className="h-screen w-full bg-[linear-gradient(to_bottom,#fff_0%,#fff_40%,#064e3b_100%)]">
        <div className="header  flex flex-row justify-center  rounded-b-xl transition-all ease-in-out duration-300 pt-2 ">
          <Header />
        </div>
        <div className="components  flex flex-col bg-white w-auto transition-all ease-in-out duration-300 shadow-2xl h-5/6 m-8 rounded-md">
          <FormDataQuery
            isLoading={isLoading}
            downloadData={downloadData}
            result={result}
            submit={submit}
            onChangeInputcasrn={onChangeInputcasrn}
            setShowDetails={setShowDetails}
            showDetails={showDetails}
          />
          <div className="flex-1  overflow-hidden">
            {isLoading && (
              <Loader />
            )}

            {result && (
              <>
                <PieChart
                  cas_rn={cas_rn}
                  setHoverEffectDatabases={setHoverEffectDatabases}
                />
                <VisualizeData
                  setSelectedDatabase={setSelectedDatabase}
                  hoverEffectDatabases={hoverEffectDatabases}
                  result={result}
                  selectedDatabase={selectedDatabase}
                  handleChangeDatabase={handleChangeDatabase}
                />
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
      <AnimatePresence>
        {result && selectedDatabase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed shadow p-1 ring-2 ring-neutral-200 rounded-md  
             w-[95%] h-[95%] bg-neutral-100 top-[1%] left-[2.5%] flex flex-col"
          >
            <ModalInformationDatabase
              result={result}
              selectedDatabase={selectedDatabase}
              setSelectedDatabase={setSelectedDatabase}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
