export default function AdminLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3 text-white/50">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A24D]/30 border-t-[#C9A24D] animate-spin" />
        <span className="text-xs tracking-wider uppercase">Loading Dashboard…</span>
      </div>
    </div>
  );
}
