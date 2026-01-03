"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Fingerprint, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { verifyPassword } from "../../services/api";

interface VerifyForm { password: string; hashed_password: string; }

export default function ValidationModule() {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const form = useForm<VerifyForm>();

  const onVerifyPassword = async (data: VerifyForm) => {
    try {
      const res = await verifyPassword(data.password, data.hashed_password);
      setIsValid(Boolean(res?.valid));
    } catch {
      setIsValid(false);
    }
  };

  const container =
    "relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl h-[550px] flex flex-col transition-all duration-300 hover:border-white/20";

  return (
    <div className={container}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm font-bold flex gap-3 text-cyan-400 tracking-[0.2em] uppercase">
          <Fingerprint size={18} /> Validation_Module
        </h2>
        <button onClick={() => { setIsValid(null); form.reset(); }} className="text-slate-600 hover:text-white transition">
          <RefreshCw size={16} />
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onVerifyPassword)} className="space-y-4">
        <input
          {...form.register("password")}
          type="password"
          placeholder="Plaintext password..."
          className="w-full bg-black/40 border border-cyan-500/20 rounded-xl p-4 text-sm font-mono focus:border-cyan-500/50 outline-none"
        />
        <textarea
          {...form.register("hashed_password")}
          placeholder="Paste Hash here..."
          className="w-full bg-black/40 border border-cyan-500/20 rounded-xl p-4 text-sm font-mono h-32 resize-none focus:border-cyan-500/50 outline-none"
        />
        <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black py-3 rounded-xl uppercase tracking-widest transition-all">
          Verify_Payload
        </button>
      </form>

      <div className="mt-6 flex-1 flex flex-col justify-center border-t border-white/5 pt-6">
        {isValid !== null && (
          <div
            className={`flex flex-col items-center gap-4 p-6 rounded-2xl border-2 ${
              isValid ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-400" : "border-red-500/40 bg-red-500/5 text-red-400"
            }`}
          >
            {isValid ? <CheckCircle size={40} /> : <XCircle size={40} />}
            <span className="text-sm font-black tracking-[0.3em] uppercase italic">
              {isValid ? "Match_Verified" : "Verification_Failed"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
