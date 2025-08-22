import { useState, useEffect } from "react";

function VisualizeData({ result }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);




  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const keys = Object.keys(result);
  const [selectedDatabase, setSelectedDatabase] = useState("");

    const handleChange = (event) => {
    setSelectedDatabase(event.target.value);
  };



  return (
    <div className="flex flex-col h-full px-10 py-4">
      {!isMobile && (
        <div className="flex flex-row flex-wrap gap-2  border-b border-dashed pb-[2vh]">
          {keys.map((key, index) => {
            const isActive = selectedDatabase === key;
            if (result[key] !== null) {
              return (
                <button
                  className={`${
                    isActive
                      ? "shadow-green-900/30 text-black"
                      : "text-gray-500"
                  }  hover:shadow-green-900/30 min-w-44 transition-all duration-300 ease-in-out rounded hover:text-black  shadow-md  p-1 transform hover:-translate-y-1`}
                  key={index}
                  onClick={() => setSelectedDatabase(key)}
                >
                  {key}
                </button>
              );
            }
          })}
        </div>
      )}
      {isMobile  &&
      <select className="bg-white border rounded   p-[1px]" value={selectedDatabase} onChange={handleChange} >
          {keys.map((key, index) => {
            if (result[key] !== null) {
              return (
                <option
             
                value={key}
                >
                  {key}
                </option>
              );
            }
          })}
      </select>
      }
      <div className="mt-[2vh] flex-1 overflow-auto">
        {selectedDatabase &&
          result[selectedDatabase]["index"].map((value, idx) => (
            <div
              key={idx}
              className="flex flex-row gap-20  items-start border-b  border-neutral-100 "
            >
              <span className="text-green-900 w-32 flex-none ">{value}</span>
              {result[selectedDatabase]["data"][idx].map((value) => (
                <span className="flex-1 text-neutral-500"> {value} </span>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default VisualizeData;
