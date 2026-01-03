import HashGenerator from "@/components/password/HashGenerator";
import StrengthTest from "@/components/password/StrengthTest";
import ValidationModule from "@/components/password/ValidationModule";


export default function PasswordPage() {
  return (
    <div className="relative mt-12 z-10 w-full max-w-7xl mx-auto px-6 pb-16 font-sans text-slate-200">
      <header className="text-center mb-14">
        <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 italic">
          PASSWORD_DEPT_V2
        </h1>
        <p className="text-slate-500 text-xs uppercase tracking-[0.5em] mt-3">
          Secure Entropy Analysis & Hashing Protocol
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-5">
        <StrengthTest />
        <HashGenerator />
        <ValidationModule />
      </div>
    </div>
  );
}
