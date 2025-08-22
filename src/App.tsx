import './App.css'
import Header from './components/Header'
import FormDataQuery from './components/FormData'
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import * as genotoxApi from "./service/genotoxService"
import { toast} from 'react-toastify';
import VisualizeData from './components/VisualizeData';
import saveBlobAsExcel from "./utils/saveBlobAsExcel"
function App() {
  const [cas_rn, setCASRN] = useState<any>()
  const [showDetails, setShowDetails] = useState<any>(false)
  const [progressQuery, setProgressQuery] = useState<number>(0)
  const [result, setResult] = useState<any>(false);
  const onChangeInputcasrn = (event) => {
    setCASRN(event.target.value)
  };


  // Form 
  const submit = async () => {
    setResult(false)
    let siguePidiendoProgreso = true;

    // Creamos un toast de carga y guardamos su id para actualizarlo
    const toastId = toast.loading("Processing data 0%");

    async function sondearProgreso() {
      if (!siguePidiendoProgreso) return;

      const resultado = await genotoxApi.queryProgress(cas_rn);
      const progress = Number(resultado.data.progress);

      // Actualizamos el estado local si lo necesitas para otros propósitos
      setProgressQuery(progress);

      // Actualizamos el toast con el nuevo valor de progreso
      toast.update(toastId, { render: `Processing data ${progress}%` });

      // Si el progreso sigue siendo menor al 100, volvemos a sondear
      if (progress < 100) {
        setTimeout(sondearProgreso, 1000);
      }
    }


    async function iniciarProceso() {
      const formData = new FormData();
      formData.append("cas_rn", cas_rn);
      formData.append("details", showDetails);

      try {
        // Iniciamos el sondeo un poco después de arrancar la petición
        setTimeout(sondearProgreso, 500);

        // Ejecutamos la petición
        const result = await genotoxApi.query(formData);

        if (!result.data.download_ready) {
          toast.update(toastId, {
            render: result.data.error,
            type: "error",
            isLoading: false,
            autoClose: 3000
          });
          siguePidiendoProgreso = false;
          return

        }
        // Finalizamos el sondeo
        siguePidiendoProgreso = false;

        // Actualizamos el toast de carga a éxito
        toast.update(toastId, {
          render: "Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
        setProgressQuery(100)
        console.log(result.data.data)
        setResult(result.data.data)
      } catch (error) {
        console.error(error);
        siguePidiendoProgreso = false;

        // Actualizamos el toast a error
        toast.update(toastId, {
          render: "Error",
          type: "error",
          isLoading: false,
          autoClose: 3000
        });


      }

    }

    iniciarProceso();
  };

  const downloadData =  async () => {
 
    const formData = { cas_rn: cas_rn, data: result };
    const response = await genotoxApi.downloadData(formData);
    const blob = new Blob(
      [response.data],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    );
    saveBlobAsExcel(blob, `gt_result_${cas_rn}.xlsx`);
  }
  
  return (
    <>

      <div className="h-screen w-full bg-gradient-to-b from-white via-white to-green-800  ">
        <div className='header  flex flex-row justify-center  rounded-b-xl transition-all ease-in-out duration-300     px-8 pt-4'>
          <Header />
        </div>
        <div className='components  flex flex-col bg-white w-auto transition-all ease-in-out duration-300 shadow-2xl h-5/6 m-8 rounded-md'>
          <FormDataQuery downloadData={downloadData} result={result} submit={submit} onChangeInputcasrn={onChangeInputcasrn} progressQuery={progressQuery} setShowDetails={setShowDetails} showDetails={showDetails} />
          {result &&
            (
              <div className='flex-1 overflow-hidden'>
      <VisualizeData result={result} />
              </div>
        
            )
          }
        </div>
        <div className=' text-center  flex flex-col'>
          <span className='  text-sm text-white opacity-100'>2025 Genotox DataBase. Version 0.0.1. </span>
          <span className='  text-sm text-white opacity-75'>For maximum safety cross-check <span className='font-semibold opacity-100'> <a className='cursor-pointer transtiion-all duration-300 ease-in-out' target='_blank' href="https://www.echemportal.org/echemportal/">eChemPortal</a> ,Lhasa Vitic, <a className='cursor-pointer transtiion-all duration-300 ease-in-out' target='_blank' href="https://lcdb.lhasacloud.org/login">Lhasa CDB</a>  </span> </span>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
