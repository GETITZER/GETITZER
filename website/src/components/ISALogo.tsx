export function ISALogoNav() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <img src="/images/logo.png" alt="ISA Valve Solutions" className="h-8 w-auto" />
      <div className="flex flex-col leading-none">
        <span className="text-white font-extrabold text-sm tracking-tight">ISA Valve Solutions</span>
        <span className="text-slate-400 text-[10px] font-medium tracking-wide">& Industrial Supplies</span>
      </div>
    </div>
  )
}
