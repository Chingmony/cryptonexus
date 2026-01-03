"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { aesEncrypt } from "@/services/api";
import { Lock } from "lucide-react";
import CopyButton from "../CopyButton"; 
interface EncryptForm {
  message: string;
}

export default function EncryptAES() {
  const { register, handleSubmit } = useForm<EncryptForm>();
  const [encryptedData, setEncryptedData] = useState<any>(null);

  const onEncrypt = async (data: EncryptForm) => {
    const res = await aesEncrypt(data.message);
    setEncryptedData(res);
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative group h-full"
    >
      {/* Gradient shadow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />

      {/* Card container */}
      <div className="relative bg-[#0f172a]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-emerald-400">
          <Lock size={24} /> Encrypt Message
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-5 flex-shrink-0" onSubmit={handleSubmit(onEncrypt)}>
          <textarea
            {...register("message")}
            placeholder="Enter raw data here..."
            className="bg-slate-950/50 border border-emerald-500/30 rounded-xl p-4 text-slate-200 resize-none"
            rows={5}
          />
          <button className="bg-emerald-500 text-slate-950 font-bold py-3 px-6 rounded-xl hover:bg-emerald-400 transition">
            Generate Ciphertext
          </button>
        </form>

        {/* Output section stretches to fill remaining space */}
        <div className="mt-4 flex-1 flex flex-col overflow-y-auto space-y-4">
          {encryptedData &&
            ["key", "nonce", "ciphertext"].map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
                  {field}
                </span>
                <div className="flex items-start gap-2">
                  <pre className="flex-1 p-3 bg-black/40 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap break-words">
                    {encryptedData[field]}
                  </pre>
                  <CopyButton text={encryptedData[field]} label="Copy" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.section>
  );
}
