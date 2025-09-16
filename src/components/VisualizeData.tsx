import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function VisualizeData({
  result,
  selectedDatabase,
  handleChangeDatabase,
  setSelectedDatabase,
  hoverEffectDatabases,
}) {
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
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      animate={{ opacity: 1 }}
      className="flex flex-col px-1 py-1"
    >
      {!isMobile && (
        <div className="flex flex-row flex-wrap gap-2">
          {keys.map((key, index) => {
            let  isActive = undefined
            if(Object.keys(hoverEffectDatabases).length > 0) {
                isActive =  hoverEffectDatabases["databases"].includes(key);
            }else {
              isActive = false;
            }

            if (result[key] !== null) {
              return (
                <button
                  className={`${
                    isActive ? "text-black" : "text-gray-500"
                  }  min-w-44 opacity-70 hover:opacity-100 hover:text-black transition-all duration-300 ease-in-out rounded shadow-md p-1 transform hover:-translate-y-1`}
                  style={{
                    boxShadow: isActive
                      && `0px 2px 1px ${hoverEffectDatabases["color"]}`,
                      
                    
                  }}
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
      {isMobile  && (
        <select
          className="bg-white border rounded   p-[1px]"
          value={selectedDatabase}
          onChange={handleChangeDatabase}
        >
          {keys.map((key, index) => {
            if (result[key] !== null) {
              return <option value={key}>{key}</option>;
            }
          })}
        </select>
      )}
    </motion.div>
  );
}

export default VisualizeData;
