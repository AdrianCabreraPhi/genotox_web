import { useState } from "react";
import { CiKeyboard } from "react-icons/ci";
import * as genotoxApi from "../service/genotoxService";
function FormDataQuery() {
  const [cas_rn, setCASRN] = useState<any>()
  const [showDetails, setShowDetails] = useState<any>(false)
  const onChangeInputcasrn = (event) => {
    setCASRN(event.target.value)
  };

  const submit = async () => {
    // e.preventDefault();
    const formData = new FormData();
    try {

      formData.append("cas_rn", cas_rn)
      formData.append("details", showDetails);
      const result = await genotoxApi.query(formData)
      console.log(result)



    } catch (error: any) {
      console.log(error)

    }

    console.log(cas_rn)
    console.log(showDetails)
  }

  return (
    <>
      <div className="flex flex-row p-10 group gap-4 items-center border-b-2 transiton-all duration-300 ease-in-out hover:border-green-700 bg-neutral-50 hover:bg-white rounded-t-md">
        <div className="flex flex-row items-center gap-2 group">
          <CiKeyboard className="text-gray-400 transition-colors ease-out duration-300 group-hover:text-gray-600 " size={35} />
          <span className="text-gray-500 text-md transition-colors ease-out duration-300 group-hover:text-gray-950">Input data</span>
        </div>
        <div className="flex flex-row gap-5">
          <input type="text" onChange={onChangeInputcasrn} className="border-2 border-gray-300 transition-all duration-300 ease-in-out focus:border-gray-500  focus:outline-none rounded-md px-2 py-1" placeholder="Introduce a CAS Number" />
          <div className="flex flex-row gap-2 items-center">
            <input type="checkbox" onChange={() => setShowDetails(!showDetails)} className="scale-150 accent-green-600" name="showalldetails" id="showalldetails" />
            <span className="text-sm text-gray-500 ">Show all details</span>
          </div>
          {/* <span className="bg-red-500">Hacer efecto click boton se hunde</span> */}
        </div>
        <div className="flex items-center w-1/6">
          <button onClick={submit} className="rounded-md border p-1 shadow-md px-12 transition-all ease-in-out duration-300 hover:bg-gray-100 hover:text-green-900 font-semibold" type="submit">Submit</button>
        </div>
      </div>
    </>
  )
}

export default FormDataQuery
