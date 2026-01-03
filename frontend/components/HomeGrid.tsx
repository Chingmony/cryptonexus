"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Key, Lock, Hash, Cpu, ArrowRight, Zap } from "lucide-react";

export default function HomeGrid() {
  const tools = [
    { 
      title: "AES Cipher", 
      tag: "Symmetric",
      desc: "Military-grade data concealment using 256-bit AES protocol.", 
      features: ["Rijndael", "High Speed"],
      href: "/aes", 
      color: "from-cyan-500 to-blue-600", 
      icon: Key 
    },
    { 
      title: "RSA Mode", 
      tag: "Asymmetric",
      desc: "Generate public/private pairs for secure data exchange.", 
      features: ["Asymmetric", "Signatures"],
      href: "/rsa", 
      color: "from-purple-500 to-indigo-600", 
      icon: Cpu 
    },
    { 
      title: "Pass Lab", 
      tag: "Entropy",
      desc: "Evaluate strength and identify pattern vulnerabilities.", 
      features: ["Metrics", "Patterns"],
      href: "/password", 
      color: "from-emerald-500 to-teal-600", 
      icon: Lock 
    },
    { 
      title: "Hash Scan", 
      tag: "Integrity",
      desc: "Compute fingerprints to detect binary modifications.", 
      features: ["SHA-256", "Tamper Check"],
      href: "/hash", 
      color: "from-orange-500 to-red-600", 
      icon: Hash 
    },
  ];

  return (
    <div className="relative w-full min-h-screen"> 
      <main className="flex flex-col items-center justify-center px-4 py-20">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-black tracking-[0.2em] uppercase mb-8">
            <ShieldCheck size={16} className="animate-pulse" />
            Nexus_Terminal_Online
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-600">
            Crypto<span className="text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Nexus</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed font-medium">
            Professional cryptographic suite. <span className="text-slate-200">Protect and verify</span> your digital assets.
          </p>
        </motion.div>

        {/* 4-COLUMN TACTICAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1440px]">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={tool.href}
                className="group relative block p-px rounded-[2rem] bg-slate-800/50 hover:bg-white/10 transition-all duration-500 h-full"
              >
                <div className={`absolute inset-0 opacity-10 group-hover:opacity-60 blur-xl transition-opacity duration-500 bg-gradient-to-br ${tool.color}`} />
                
                <div className="relative bg-[#0f172a]/95 backdrop-blur-xl p-8 rounded-[1.9rem] h-full border border-white/5 flex flex-col">
                  
                  {/* Top Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} shadow-2xl shadow-black group-hover:scale-110 transition-transform`}>
                      <tool.icon className="text-white" size={32} />
                    </div>
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase text-slate-500 border border-slate-800 px-2 py-1 rounded">
                      {tool.tag}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-3 flex items-center gap-2">
                      {tool.title}
                      <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
                    </h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {tool.desc}
                    </p>

                    {/* Feature Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {tool.features.map(feature => (
                        <span key={feature} className="text-[9px] font-bold py-1 px-2.5 bg-white/5 rounded-md text-slate-400 uppercase tracking-tighter border border-white/5">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-5 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-black text-cyan-500/80 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                      Init_Module
                    </span>
                    <Zap size={14} className="text-slate-600 group-hover:text-yellow-400 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* DECORATION */}
        <div className="mt-10 opacity-20 flex flex-col items-center gap-2">
          <div className="h-px w-20 bg-cyan-500" />
          <span className="text-[9px] font-black tracking-[0.4em] text-slate-500 uppercase">Secure_Encryption_Standard</span>
        </div>
      </main>
    </div>
  );
}
