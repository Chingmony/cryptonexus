import DecryptAES from "@/components/aes/DecryptAES";
import EncryptAES from "@/components/aes/EncryptAES";

export default function AESPage() {
  return (
    <div className="relative mt-20 z-10 w-full max-w-6xl mx-auto">
      {/* Page Header */}
      <header className="text-center mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">
          AES Laboratory
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
          AES Laboratory
        </h1>
        <p className="text-slate-400 text-lg max-w-full mx-auto">
          Military-grade encryption for your sensitive data. Everything is processed locally for maximum privacy.
        </p>
      </header>
      <div className="h-full grid md:grid-cols-2 gap-8 mt-10">
      <EncryptAES />
      <DecryptAES />
    </div>
    </div>
  );
}
