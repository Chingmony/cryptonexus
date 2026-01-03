"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { rsaEncrypt } from "../../services/api";
import CopyButton from "../CopyButton";
import { Lock, Share2 } from "lucide-react";

export default function EncryptSection() {
  const { register, handleSubmit } = useForm<{ message: string }>();
  const [encryptedData, setEncryptedData] = useState<any>(null);

  const onEncrypt = async (data: { message: string }) =>
    setEncryptedData(await rsaEncrypt(data.message));

  const containerClasses =
    "relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl h-[550px] flex flex-col";

  return (
    <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
      <div className={containerClasses}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-400 uppercase tracking-tight">
          <Lock size={20} /> Encrypt Engine
        </h2>

        <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit(onEncrypt)}>
          <textarea
            {...register("message")}
            placeholder="Enter raw message..."
            className="bg-slate-950/50 border border-purple-500/30 rounded-xl p-4 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition h-32 resize-none text-sm"
          />
          <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-purple-900/20">
            Execute Encryption
          </button>
        </form>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          <AnimatePresence>
            {encryptedData ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-4">
                {/* Ciphertext */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-purple-500 font-bold uppercase">Ciphertext</span>
                    <CopyButton text={encryptedData.ciphertext} label="Copy" />
                  </div>
                  <div className="p-3 bg-black/40 border border-purple-500/10 rounded-lg text-[10px] text-purple-300 font-mono break-all">
                    {encryptedData.ciphertext}
                  </div>
                </div>
                {/* Public Key */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-cyan-500 font-bold uppercase">Public Key</span>
                    <CopyButton text={encryptedData.public_key} label="Copy" />
                  </div>
                  <div className="p-3 bg-black/40 border border-cyan-500/10 rounded-lg text-[10px] text-cyan-300/70 font-mono whitespace-pre overflow-x-auto">
                    {encryptedData.public_key.replace(/\\n/g, "\n")}
                  </div>
                </div>
                {/* Private Key */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-fuchsia-500 font-bold uppercase">Private Key</span>
                    <CopyButton text={encryptedData.private_key} label="Copy" />
                  </div>
                  <div className="p-3 bg-black/40 border border-fuchsia-500/10 rounded-lg text-[10px] text-fuchsia-400/70 font-mono whitespace-pre overflow-x-auto">
                    {encryptedData.private_key.replace(/\\n/g, "\n")}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-700 border-2 border-dashed border-white/5 rounded-xl">
                <Share2 size={40} className="mb-2 opacity-20" />
                <p className="text-xs italic uppercase tracking-widest">Waiting for data input...</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
