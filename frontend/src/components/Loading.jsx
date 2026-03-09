import { motion } from "motion/react";

function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-black"
        />

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-sm font-medium text-gray-600"
        >
          Loading, please wait...
        </motion.p>
      </div>
    </div>
  );
}

export default Loading;
