import "./App.css";
import Header from "./components/Header";
import FormDataQuery from "./components/FormData";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

import VisualizeData from "./components/VisualizeData";

import PieChart from "./components/pieChart";
import { AnimatePresence, motion } from "framer-motion";
import ModalInformationDatabase from "./components/ModalInformationDatabase";
import Footer from "./components/Footer";
import useDownloadData from "./hooks/useDownloadData";
import ButtonDownloadData from "./components/ButtonDownloadData";


function App() {
  const [result, setResult] = useState<object | boolean>(false);
  const [submittedCas, setSubmittedCas] = useState("");
  const [hoverEffectDatabases, setHoverEffectDatabases] = useState<object>({});
  const [selectedDatabase, setSelectedDatabase] = useState<string | undefined>(
    undefined,
  );
  const {downloadData} = useDownloadData();

  const handleSubmittedCasNum = (casNum:string) => {
    setSubmittedCas(casNum)
  }

  const handleDownloadData = () => {
    downloadData(submittedCas,result)
  }

  const handleChangeDatabase = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDatabase(event.target.value);
  };



  return (
    <>
      <div className="min-h-screen w-full bg-[linear-gradient(to_bottom,#fff_0%,#fff_40%,#064e3b_100%)] flex flex-col">
        <div className="header  flex flex-row justify-center  rounded-b-xl transition-all ease-in-out duration-300 pt-2 ">
          <Header />
        </div>
        <div className="components  flex flex-col bg-white w-auto transition-all ease-in-out duration-300 shadow-2xl flex-grow m-8 rounded-md">
            <div className="relative group flex flex-col md:flex-row justify-between w-full px-4 py-4 gap-4 items-start bg-neutral-50   rounded-t-md">
          <FormDataQuery
            setResult={setResult}
            handleSubmittedCasNum={handleSubmittedCasNum}
          />
          <ButtonDownloadData downloadData={handleDownloadData} />
          </div>
          
          <div className="flex-1  overflow-hidden">
            {result && (
              <>
                <VisualizeData
                  setSelectedDatabase={setSelectedDatabase}
                  hoverEffectDatabases={hoverEffectDatabases}
                  result={result}
                  selectedDatabase={selectedDatabase}
                  handleChangeDatabase={handleChangeDatabase}
                />
                <PieChart
                  casNum={submittedCas}
                  setHoverEffectDatabases={setHoverEffectDatabases}
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
