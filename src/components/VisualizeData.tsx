import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function VisualizeData({ result,selectedDatabase,handleChangeDatabase,setSelectedDatabase }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const keys = Object.keys(result);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);





  return (
    <motion.div initial={{opacity:0}}   transition={{ duration: 0.3,delay:0.1  }} animate={{opacity:1}}  className="flex flex-col h-full px-10 py-4">
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
      <select className="bg-white border rounded   p-[1px]" value={selectedDatabase} onChange={handleChangeDatabase} >
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
                <span className={`flex-1   ${value == "Positive" ? "text-red-500" : "text-neutral-500"} `}> {value} </span>
              ))}
            </div>
          ))}
      </div>
    </motion.div>
  );
}

export default VisualizeData;
