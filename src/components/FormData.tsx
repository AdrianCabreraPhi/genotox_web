import { CiKeyboard } from "react-icons/ci";
import { FaFileDownload } from "react-icons/fa";

function FormDataQuery({ submit,isLoading, onChangeInputcasrn, progressQuery, setShowDetails, showDetails, result, downloadData }) {



  return (
    <>
<div className="relative group flex flex-col md:flex-row justify-between w-full px-4 py-4 gap-4 items-start bg-neutral-50 hover:bg-white rounded-t-md">
  <div className="flex flex-wrap items-center gap-2 group">
    <CiKeyboard className="text-gray-400 hidden md:visible transition-colors ease-out duration-300 group-hover:text-gray-600 " size={25} />
    <div className="flex flex-wrap gap-3">
      <input
        type="text"
        onChange={onChangeInputcasrn}
        className="border-2 border-gray-300 placeholder:text-xs md:placeholder:text-base transition-all duration-300 w-40 md:w-auto ease-in-out focus:border-gray-500 focus:outline-none rounded-md px-2 py-1"
        placeholder="Introduce a CAS Number"
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          onChange={() => setShowDetails(!showDetails)}
          className="scale-150 accent-green-600"
          name="showalldetails"
          id="showalldetails"
        />
        <span className="text-xs md:text-sm text-gray-500">Show all details</span>
      </div>
      <button
      disabled={isLoading}
        onClick={submit}
        className={`${isLoading && "cursor-not-allowed"}  cursor-pointer md:text-base text-sm m-auto md:m-0 transform hover:-translate-y-1 active:-translate-y-0 rounded-md border p-1 shadow-md px-12 text-neutral-500 transition-all ease-in-out duration-300 hover:bg-gray-100 hover:text-green-900 font-semibold`}
        type="submit"
      >
        Submit
      </button>
    </div>
  </div>

  <button
    disabled={!result}
    onClick={downloadData}
    className="rounded-md border disabled:grayscale grayscale-0 disabled:opacity-50 text-green-600 disabled:cursor-not-allowed p-1 px-2 shadow-md transition-all ease-in-out duration-300 hover:bg-gray-100 transform hover:-translate-y-1 active:-translate-y-0 font-semibold"
  >
    <FaFileDownload size={20} />
  </button>
</div>

    </>
  )
}

export default FormDataQuery
