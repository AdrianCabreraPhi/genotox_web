import { FaFileDownload } from "react-icons/fa";

type ButtonDownloadDataProps = {
  downloadData: () => void
}
function ButtonDownloadData(props: ButtonDownloadDataProps) {
  return (
    <button
      onClick={props.downloadData}
      className="rounded-md border disabled:grayscale grayscale-0 disabled:opacity-50 text-green-600 disabled:cursor-not-allowed p-1 px-2 shadow-md transition-all ease-in-out duration-300 hover:bg-gray-100 transform hover:-translate-y-1 active:-translate-y-0 font-semibold"
    >
      <FaFileDownload size={20} />
    </button>
  );
}

export default ButtonDownloadData;
