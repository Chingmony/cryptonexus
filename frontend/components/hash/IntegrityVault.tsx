"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, FileCode, AlertTriangle, RefreshCw, FileText } from "lucide-react";
import { verifyIntegrity } from "../../services/api";

export default function IntegrityVault() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [integrityRes, setIntegrityRes] = useState<{ intact: boolean; message: string } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!file1 || !file2) return;
    setIsVerifying(true);
    try {
      const res = await verifyIntegrity(file1, file2);
      setIntegrityRes({ intact: res.intact, message: res.message });
    } catch {
      setIntegrityRes({ intact: false, message: "System failure during binary comparison." });
    } finally {
      setIsVerifying(false);
    }
  };

  const container =
    "relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl h-[580px] flex flex-col transition-all duration-300 hover:border-white/20";

  return (
    <div className={container}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm font-bold flex gap-3 text-red-400 tracking-[0.2em] uppercase">
          <ShieldCheck size={18} /> Integrity_Vault
        </h2>
        <button onClick={() => { setFile1(null); setFile2(null); setIntegrityRes(null); }} className="text-slate-600 hover:text-white transition">
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {[file1, file2].map((f, idx) => (
          <label key={idx} className="flex items-center gap-4 bg-black/40 border border-white/5 p-3 rounded-xl cursor-pointer hover:border-red-500/30 transition-all">
            <input type="file" className="hidden" onChange={e => (idx === 0 ? setFile1(e.target.files?.[0] || null) : setFile2(e.target.files?.[0] || null))} />
            <div className="bg-red-500/10 p-2 rounded-lg text-red-400"><FileText size={16} /></div>
            <span className="text-[10px] font-mono text-slate-400 truncate flex-1">{f ? f.name : idx === 0 ? "Select Source File" : "Select Comparison File"}</span>
          </label>
        ))}

        <button
          onClick={handleVerify}
          disabled={!file1 || !file2 || isVerifying}
          className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-30 text-white text-xs font-black py-4 rounded-xl uppercase tracking-widest transition-all mt-2"
        >
          {isVerifying ? "Analyzing_Nodes..." : "Compare_Nodes"}
        </button>
      </div>

      <div className="mt-8 flex-1 flex flex-col justify-center border-t border-white/5 pt-6">
        <AnimatePresence mode="wait">
          {integrityRes && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`flex flex-col items-center text-center gap-4 p-6 rounded-2xl border-2 ${integrityRes.intact ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-400" : "border-red-500/40 bg-red-500/5 text-red-400"}`}
            >
              {integrityRes.intact ? <FileCode size={40} /> : <AlertTriangle size={40} />}
              <div>
                <span className="text-sm font-black tracking-[0.3em] uppercase block mb-1">
                  {integrityRes.intact ? "Match_Confirmed" : "Checksum_Mismatch"}
                </span>
                <p className="text-[10px] font-mono opacity-60 italic">{integrityRes.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
