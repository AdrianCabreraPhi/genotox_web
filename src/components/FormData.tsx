import { CiKeyboard } from "react-icons/ci";
import { FaFileDownload } from "react-icons/fa";

function FormDataQuery({ submit, onChangeInputcasrn, progressQuery, setShowDetails, showDetails, result, downloadData }) {



  return (
    <>
      <div className="relative group flex flex-row justify-between w-full  px-10 py-4 gap-4 items-start bg-neutral-50 hover:bg-white rounded-t-md">

        <div className="flex flex-row items-center gap-2 group">
          <span
            className="absolute bottom-0 left-0 h-1 bg-green-700 transition-all duration-300 text-white"
            style={{ width: `${progressQuery}%` }}
          >  </span>
          <CiKeyboard className="text-gray-400 transition-colors ease-out duration-300 group-hover:text-gray-600 " size={25} />
          <div className="flex flex-row gap-5">
            <input type="text" onChange={onChangeInputcasrn} className="border-2 border-gray-300 transition-all duration-300 ease-in-out focus:border-gray-500  focus:outline-none rounded-md px-2 py-1" placeholder="Introduce a CAS Number" />
            <div className="flex flex-row gap-2 items-center">
              <input type="checkbox" onChange={() => setShowDetails(!showDetails)} className="scale-150 accent-green-600" name="showalldetails" id="showalldetails" />
              <span className="text-sm text-gray-500 ">Show all details</span>
            </div>
            {/* <span className="bg-red-500">Hacer efecto click boton se hunde</span> */}
            <div className="flex items-center  gap-5">
              <button onClick={submit} className="cursor-pointer transform hover:-translate-y-1 active:-translate-y-0  rounded-md border p-1 shadow-md px-12 text-neutral-500  transition-all ease-in-out duration-300 hover:bg-gray-100 hover:text-green-900 font-semibold" type="submit">Submit</button>
            </div>
          </div>
        </div>

        <button disabled={!result} onClick={downloadData} className="rounded-md border  disabled:grayscale grayscale-0 disabled:opacity-50 text-green-600 disabled:cursor-not-allowed  p-1 px-2 shadow-md transition-all ease-in-out duration-300 hover:bg-gray-100 transform hover:-translate-y-1 active:-translate-y-0  font-semibold "><FaFileDownload size={20} /></button>

      </div>
    </>
  )
}

export default FormDataQuery
