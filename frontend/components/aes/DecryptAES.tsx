"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { aesDecrypt } from "@/services/api";
import { Unlock } from "lucide-react";
import CopyButton from "../CopyButton";

interface DecryptForm {
  key: string;
  nonce: string;
  ciphertext: string;
}

export default function DecryptAES() {
  const { register, handleSubmit } = useForm<DecryptForm>();
  const [decryptedData, setDecryptedData] = useState<string>("");

  const onDecrypt = async (data: DecryptForm) => {
    const res = await aesDecrypt(data.key, data.nonce, data.ciphertext);
    setDecryptedData(res.plaintext);
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative group h-full"
    >
      
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />

      
      <div className="relative bg-[#0f172a]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-400">
          <Unlock size={24} /> Decrypt Cipher
        </h2>

        {/* Form section */}
        <form className="flex flex-col gap-5 flex-shrink-0" onSubmit={handleSubmit(onDecrypt)}>
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("key")}
              placeholder="Secret Key"
              className="bg-slate-950/50 border border-blue-500/30 rounded-xl p-4 text-slate-200"
            />
            <input
              {...register("nonce")}
              placeholder="Nonce/IV"
              className="bg-slate-950/50 border border-blue-500/30 rounded-xl p-4 text-slate-200"
            />
          </div>
          <textarea
            {...register("ciphertext")}
            placeholder="Enter encrypted ciphertext..."
            className="bg-slate-950/50 border border-blue-500/30 rounded-xl p-4 text-slate-200 resize-none"
            rows={3}
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition">
            Decipher Data
          </button>
        </form>

        <div className="mt-4 flex-1 overflow-y-auto flex flex-col justify-start">
          {decryptedData && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">
                Recovered Message:
              </p>
              <div className="p-4 bg-black/40 border border-blue-500/20 rounded-xl text-blue-100 font-mono whitespace-pre-wrap break-words flex-1 overflow-y-auto">
                {decryptedData}
              </div>
              <div className="flex justify-end mt-2">
                <CopyButton text={decryptedData} label="Copy Message" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
