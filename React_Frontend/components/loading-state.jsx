"use client"

import { motion } from "framer-motion"

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-muted-foreground"
      >
        Loading data...
      </motion.p>
    </div>
  )
}

