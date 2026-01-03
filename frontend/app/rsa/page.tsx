
import DecryptSection from "@/components/rsa/DecryptSection";
import EncryptSection from "@/components/rsa/EncryptSection";
import { Cpu } from "lucide-react";

export default function RSAPage() {
  return (
    <div className="relative mt-10 z-10 w-full max-w-6xl mx-auto px-4 pb-20">
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
          <Cpu size={14} /> Asymmetric Laboratory
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-500 pb-2">
          RSA Toolchain
        </h1>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <EncryptSection  />
        <DecryptSection />
      </div>
    </div>
  );
}
