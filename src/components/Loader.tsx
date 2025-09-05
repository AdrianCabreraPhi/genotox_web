import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="fixed inset-0  flex-col gap-8 flex items-center justify-center  z-50">
      <motion.span
        initial={{ y: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        animate={{ y: [30, 0, 30] }}
        className="block w-7 h-7 rounded-full bg-[#175542]"
      ></motion.span>
      <motion.span
        transition={{ duration: 2, repeat: Infinity }}
        animate={{ width: [50, 0, 50] }}
        className=" rounded-lg  h-4 block bg-neutral-100"
      >
        {" "}
      </motion.span>
    </div>
  );
}

export default Loader;
