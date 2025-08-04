// components/match-overlay.tsx
"use client"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function MatchOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center p-8 bg-gradient-to-br from-pink-500 via-red-700 to-yellow-400 rounded-2xl shadow-2xl text-white"
      >
        <div className="text-5xl font-extrabold flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 animate-pulse" />
          It's a Match 💘💘!
          <Sparkles className="w-10 h-10 animate-pulse" />
        </div>
        <p className="mt-4 text-lg">You both liked each other 🎉</p>
      </motion.div>
    </motion.div>
  )
}
