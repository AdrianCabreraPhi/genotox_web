import { CiKeyboard } from "react-icons/ci";
import { FaFileDownload } from "react-icons/fa";



type formDataQueryProps = {
  submit : () => void,
  isLoading: boolean,
  onChangeInputcasrn: (event:React.ChangeEvent<HTMLInputElement>) => void,
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>,
  showDetails: boolean,
  result: object | boolean,
  downloadData:  () => void
}


function FormDataQuery(props:formDataQueryProps) {
  return (
    <>
      <div className="relative group flex flex-col md:flex-row justify-between w-full px-4 py-4 gap-4 items-start bg-neutral-50   rounded-t-md">
        <div className="flex flex-wrap items-center gap-2 group">
          <CiKeyboard
            className="text-gray-400 hidden md:visible transition-colors ease-out duration-300 group-hover:text-gray-600 "
            size={25}
          />
                      <input
              type="text"
              onChange={props.onChangeInputcasrn}
              className="border-2 border-gray-300 placeholder:text-xs md:placeholder:text-base transition-all duration-300 w-40 md:w-auto ease-in-out focus:border-gray-500 focus:outline-none rounded-md px-2 py-1"
              placeholder="Introduce a CAS Number"
            />
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2 items-center">
                          <input
              type="checkbox"
              onChange={() => props.setShowDetails(!props.showDetails)}
              className="scale-150 accent-green-600"
              name="showalldetails"
              id="showalldetails"
              title="show all details"
            />
        <span className="text-xs text-neutral-600">Show all details</span>
            </div>


            <button
              disabled={props.isLoading}
              onClick={props.submit}
              className={`${
                props.isLoading ? "cursor-not-allowed" : "cursor-pointer"
              }   md:text-base text-sm m-auto md:m-0 transform hover:-translate-y-1 active:-translate-y-0 rounded-md border p-1 shadow-md px-12 text-neutral-500 transition-all ease-in-out duration-300 hover:bg-gray-100 hover:text-green-900 font-semibold`}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>

        <button
          disabled={!props.result}
          onClick={props.downloadData}
          className="rounded-md border disabled:grayscale grayscale-0 disabled:opacity-50 text-green-600 disabled:cursor-not-allowed p-1 px-2 shadow-md transition-all ease-in-out duration-300 hover:bg-gray-100 transform hover:-translate-y-1 active:-translate-y-0 font-semibold"
        >
          <FaFileDownload size={20} />
        </button>
      </div>
    </>
  );
}

export default FormDataQuery;
