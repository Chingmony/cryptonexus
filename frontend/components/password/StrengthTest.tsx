"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, RefreshCw } from "lucide-react";
import { checkPasswordStrength } from "../../services/api";

interface PasswordForm { password: string; }
interface StrengthResult {
  score: number;
  strength: string;
  warnings: string[];
  suggestions: string[];
}

function normalizeStrength(raw: any): StrengthResult {
  const data = raw?.strength || raw;
  return {
    score: Number(data?.score ?? 0),
    strength: String(data?.strength ?? "Unknown"),
    warnings: Array.isArray(data?.warnings) ? data.warnings.map(String) : [],
    suggestions: Array.isArray(data?.suggestions) ? data.suggestions.map(String) : [],
  };
}

export default function StrengthTest() {
  const [strengthData, setStrengthData] = useState<StrengthResult | null>(null);
  const form = useForm<PasswordForm>();

  const onCheckStrength = async ({ password }: PasswordForm) => {
    if (!password) return setStrengthData(null);
    try {
      const res = await checkPasswordStrength(password);
      setStrengthData(normalizeStrength(res));
    } catch {
      setStrengthData(null);
    }
  };

  const container =
    "relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl h-[550px] flex flex-col transition-all duration-300 hover:border-white/20";

  return (
    <div className={container}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm font-bold flex gap-3 text-emerald-400 tracking-[0.2em] uppercase">
          <Activity size={18} /> Strength_Test
        </h2>
        <button onClick={() => { setStrengthData(null); form.reset(); }} className="text-slate-600 hover:text-white transition">
          <RefreshCw size={16} />
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onCheckStrength)} className="space-y-4">
        <input
          {...form.register("password")}
          type="password"
          placeholder="Enter password..."
          className="w-full bg-black/40 border border-emerald-500/20 rounded-xl p-4 text-sm font-mono focus:border-emerald-500/50 outline-none"
        />
        <button className="w-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-black py-3 rounded-xl uppercase tracking-widest hover:bg-emerald-600/30 transition-all">
          Analyze_Entropy
        </button>
      </form>

      <div className="mt-8 flex-1 overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence>
          {strengthData && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className="p-5 text-center bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <span className="text-lg text-emerald-400 font-black uppercase tracking-widest">
                  {strengthData.strength}
                </span>
                <div className="mt-4 h-2.5 bg-black/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(strengthData.score / 4) * 100}%` }}
                    className={`h-full ${strengthData.score < 3 ? "bg-yellow-500" : "bg-emerald-500"}`}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-3 uppercase tracking-widest font-bold">
                  Score: {strengthData.score} / 4
                </p>
              </div>

              {strengthData.warnings.length > 0 && (
                <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-xl text-xs text-red-400 font-mono leading-relaxed">
                  <p className="font-black mb-2 uppercase text-red-500 tracking-wider">! Warnings_Detected</p>
                  {strengthData.warnings.map((w, i) => <p key={i} className="mb-1">» {w}</p>)}
                </div>
              )}

              {strengthData.suggestions.length > 0 && (
                <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-xl text-xs text-blue-300 font-mono leading-relaxed">
                  <p className="font-black mb-2 uppercase text-blue-400 tracking-wider">» Tactical_Advice</p>
                  {strengthData.suggestions.map((s, i) => <p key={i} className="mb-1">_ {s}</p>)}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
