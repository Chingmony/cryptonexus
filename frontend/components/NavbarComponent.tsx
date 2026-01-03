"use client";

import React, { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Key, FileText, Hash, Cpu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = useMemo(() => [
    { href: "/aes", icon: Key, label: "AES" },
    { href: "/rsa", icon: Cpu, label: "RSA" },
    { href: "/", icon: Home, label: "Home" },
    { href: "/password", icon: FileText, label: "Password" },
    { href: "/hash", icon: Hash, label: "Hash" },
  ], []);

  const getIndex = (path: string) => {
    const index = navItems.findIndex((item) => {
      if (item.href === "/") return path === "/";
      return path.startsWith(item.href);
    });
    return index !== -1 ? index : 2;
  };

  const [activeIndex, setActiveIndex] = useState(getIndex(pathname));

  useEffect(() => {
    setActiveIndex(getIndex(pathname));
  }, [pathname, navItems]);

  return (
    <nav className="fixed bottom-8 w-full max-w-5xl left-1/2 -translate-x-1/2 z-50 px-6">
      <div 
        className="relative bg-slate-950/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-cyan-400/30 px-8 py-5"
        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
      >
        <ul className="flex items-center relative w-full">
          
          {/* THE INDICATOR */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1/5 h-24 -mt-12 flex justify-center items-center pointer-events-none"
            initial={false}
            animate={{ x: `${activeIndex * 100}%` }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
          >
            {/* The Icon Frame */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 rounded-full shadow-xl shadow-teal-400/40 flex items-center justify-center">
              <motion.div
                key={activeIndex}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center"
              >
                {React.createElement(navItems[activeIndex].icon, {
                  size: 36, // Increased icon size
                  className: "text-white drop-shadow-md",
                  strokeWidth: 2.5,
                })}
              </motion.div>
              
              {/* BIGGER ACTIVE LABEL */}
              <span className="absolute -bottom-12 whitespace-nowrap text-sm font-black text-cyan-300 tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                {navItems[activeIndex].label}
              </span>
            </div>
          </motion.div>

          {/* Navigation Links */}
          {navItems.map((item, idx) => {
            const isActive = activeIndex === idx;
            const Icon = item.icon;

            return (
              <li key={item.href} className="relative flex-1 z-10">
                <Link
                  href={item.href}
                  className="flex flex-col items-center justify-center w-full py-3 group"
                >
                  <motion.div
                    animate={{
                      y: isActive ? -20 : 0,
                      opacity: isActive ? 0 : 1,
                      scale: isActive ? 0.7 : 1,
                    }}
                  >
                    <Icon
                      size={28} // Increased icon size
                      className="text-slate-400 group-hover:text-cyan-400 transition-colors"
                      strokeWidth={2}
                    />
                  </motion.div>

                  {/* BIGGER INACTIVE LABEL */}
                  <motion.span
                    className="mt-3 text-[12px] font-bold text-slate-500 tracking-widest uppercase group-hover:text-slate-300 transition-colors"
                    animate={{
                      opacity: isActive ? 0 : 1, // Increased inactive opacity for clarity
                    }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}