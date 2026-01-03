"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Binary, RefreshCw, Upload } from "lucide-react";
import { hashFile } from "../../services/api";
import CopyButton from "../CopyButton";

export default function FileHashScanner() {
  const [fileToHash, setFileToHash] = useState<File | null>(null);
  const [hashResult, setHashResult] = useState<string>("");
  const [isHashing, setIsHashing] = useState(false);

  const handleHash = async () => {
    if (!fileToHash) return;
    setIsHashing(true);
    try {
      const res = await hashFile(fileToHash);
      setHashResult(res.hash);
    } catch (err) {
      console.error("Hashing error", err);
    } finally {
      setIsHashing(false);
    }
  };

  const container =
    "relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl h-[580px] flex flex-col transition-all duration-300 hover:border-white/20";
  const dropzone =
    "flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-6 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all cursor-pointer group";

  return (
    <div className={container}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm font-bold flex gap-3 text-orange-400 tracking-[0.2em] uppercase">
          <Binary size={18} /> Hash_Scanner
        </h2>
        <button onClick={() => { setFileToHash(null); setHashResult(""); }} className="text-slate-600 hover:text-white transition">
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="space-y-4">
        <label className={dropzone}>
          <input type="file" className="hidden" onChange={e => setFileToHash(e.target.files?.[0] || null)} />
          <Upload className="text-slate-500 group-hover:text-orange-500 mb-2" size={24} />
          <span className="text-xs font-mono text-slate-400">{fileToHash ? fileToHash.name : "Select Target File"}</span>
        </label>

        <button
          onClick={handleHash}
          disabled={!fileToHash || isHashing}
          className="w-full bg-orange-600/20 disabled:opacity-30 text-orange-400 border border-orange-500/30 text-xs font-black py-4 rounded-xl uppercase tracking-widest hover:bg-orange-600/30 transition-all"
        >
          {isHashing ? "Scanning_Binary..." : "Execute_Checksum"}
        </button>
      </div>

      <div className="mt-8 flex-1 flex flex-col overflow-hidden">
        <AnimatePresence>
          {hashResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 flex-1 flex flex-col">
              <div className="flex justify-between items-center text-xs uppercase font-bold text-orange-500 tracking-widest">
                <span>Generated_SHA256</span>
                <CopyButton text={hashResult} />
              </div>
              <div className="p-6 bg-black/60 border border-orange-500/20 rounded-xl text-sm font-mono text-orange-200 break-all flex-1 overflow-y-auto custom-scrollbar italic leading-relaxed">
                {hashResult}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
