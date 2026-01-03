"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { rsaDecrypt } from "../../services/api";
import CopyButton from "../CopyButton";
import { Unlock, ShieldAlert } from "lucide-react";

export default function DecryptSection() {
  const { register, handleSubmit } = useForm<{ key: string; ciphertext: string }>();
  const [decryptedData, setDecryptedData] = useState("");

  const onDecrypt = async (data: { key: string; ciphertext: string }) => {
    const res = await rsaDecrypt(data.key, data.ciphertext);
    setDecryptedData(res.plaintext);
  };

  const containerClasses =
    "relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl h-[550px] flex flex-col";

  return (
    <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
      <div className={containerClasses}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-400 uppercase tracking-tight">
          <Unlock size={20} /> Decrypt Engine
        </h2>

        <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit(onDecrypt)}>
          <textarea
            {...register("key")}
            placeholder="Paste Private Key (PEM)..."
            className="bg-slate-950/50 border border-blue-500/30 rounded-xl p-4 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition font-mono text-xs h-32"
          />
          <textarea
            {...register("ciphertext")}
            placeholder="Paste Ciphertext..."
            className="bg-slate-950/50 border border-blue-500/30 rounded-xl p-4 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition font-mono text-xs h-24"
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20">
            Execute Decryption
          </button>
        </form>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {decryptedData ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Output Plaintext</span>
                <CopyButton text={decryptedData} label="Copy Result" />
              </div>
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-emerald-200 font-mono text-sm break-all leading-relaxed shadow-inner">
                {decryptedData}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-700 border-2 border-dashed border-white/5 rounded-xl">
              <ShieldAlert size={40} className="mb-2 opacity-20" />
              <p className="text-xs italic uppercase tracking-widest">Awaiting cipher block...</p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
