import "./App.css";
import Header from "./components/Header";
import FormDataQuery from "./components/FormData";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Footer from "./components/Footer";
import useDownloadData from "./hooks/useDownloadData";
import ButtonDownloadData from "./components/ButtonDownloadData";
import ResultDashboard from "./components/ResultDashboard";

function App() {
  const [result, setResult] = useState<object | boolean>(false);
  const [submittedCas, setSubmittedCas] = useState("");

  const { downloadData } = useDownloadData();

  const handleSubmittedCasNum = (casNum: string) => {
    setSubmittedCas(casNum);
  };

  const handleDownloadData = () => {
    downloadData(submittedCas, result);
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
          <ResultDashboard submittedCas={submittedCas} result={result} />
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
