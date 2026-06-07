export function ISALogoNav() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-white text-sm"
        style={{ background: '#F97316' }}>
        ISA
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-white font-extrabold text-sm tracking-tight">Valve Solutions</span>
        <span className="text-slate-400 text-[10px] font-medium tracking-wide">ISO 9001:2015 Certified</span>
      </div>
    </div>
  )
}
