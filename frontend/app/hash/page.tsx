import FileHashScanner from "@/components/hash/FileHashScanner";
import IntegrityVault from "@/components/hash/IntegrityVault";


export default function HashPage() {
  return (
    <div className="relative mt-12 z-10 w-full max-w-7xl mx-auto px-6 pb-16 font-sans text-slate-200">
      <header className="text-center mb-14">
        <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 italic">
          FILE_INTEGRITY_DEPT
        </h1>
        <p className="text-slate-500 text-xs uppercase tracking-[0.5em] mt-3">
          Binary Checksum & Local File Upload
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <FileHashScanner />
        <IntegrityVault />
      </div>
    </div>
  );
}
