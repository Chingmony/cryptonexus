"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Zap, RefreshCw, Copy } from "lucide-react";
import { hashPassword } from "../../services/api";
import CopyButton from "../CopyButton";

interface PasswordForm { password: string; }

export default function HashGenerator() {
  const [hashed, setHashed] = useState("");
  const form = useForm<PasswordForm>();

  const onHashPassword = async ({ password }: PasswordForm) => {
    try {
      const res = await hashPassword(password);
      setHashed(String(res?.hashed_password ?? ""));
    } catch {
      console.error("Hashing failed");
    }
  };

  const container =
    "relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl h-[550px] flex flex-col transition-all duration-300 hover:border-white/20";

  return (
    <div className={container}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm font-bold flex gap-3 text-purple-400 tracking-[0.2em] uppercase">
          <Zap size={18} /> Hash_Generator
        </h2>
        <button onClick={() => { setHashed(""); form.reset(); }} className="text-slate-600 hover:text-white transition">
          <RefreshCw size={16} />
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onHashPassword)} className="space-y-4">
        <input
          {...form.register("password")}
          type="password"
          placeholder="Enter plaintext..."
          className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-sm font-mono focus:border-purple-500/50 outline-none"
        />
        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-black py-3 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-purple-950/20">
          Generate_Hash
        </button>
      </form>

      {hashed && (
        <div className="mt-8 flex-1 flex flex-col">
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex justify-between items-center text-xs uppercase font-bold text-purple-500 tracking-widest">
              <span>Digest_Output</span>
              <CopyButton text={hashed} label="Copy" />
            </div>
            <div className="p-5 bg-black/60 border border-purple-500/20 rounded-xl text-xs font-mono text-purple-300 break-all flex-1 overflow-y-auto custom-scrollbar italic leading-relaxed">
              {hashed}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
