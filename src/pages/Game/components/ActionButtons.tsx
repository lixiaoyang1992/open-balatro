export default function ActionButtons() {
  return (
    <div className="flex gap-6 pb-3">
      <button
        type="button"
        className="px-8 py-3 rounded border-2 border-[#4060e0] bg-[#1a2060] text-white hover:bg-[#4060e0] transition-colors"
        style={{ fontSize: 10, fontFamily: "'Press Start 2P', monospace" }}
      >
        Play Hand
      </button>
      <button
        type="button"
        className="px-8 py-3 rounded border-2 border-[#e04040] bg-[#200a0a] text-[#e07070] hover:bg-[#401010] transition-colors"
        style={{ fontSize: 10, fontFamily: "'Press Start 2P', monospace" }}
      >
        Discard
      </button>
    </div>
  );
}
