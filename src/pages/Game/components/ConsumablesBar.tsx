const CONSUMABLE_SLOTS = 2;

export default function ConsumablesBar() {
  return (
    <div className="flex flex-col items-end gap-1">
      <p
        style={{
          color: "#a080d0",
          fontSize: 7,
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        CONSUMABLES
      </p>
      <div className="flex gap-2">
        {Array.from({ length: CONSUMABLE_SLOTS }).map((_, i) => (
          <div
            key={i}
            className="w-[52px] h-[52px] rounded border border-dashed border-[#3a2060] flex items-center justify-center"
          >
            <span style={{ color: "#3a2060", fontSize: 18 }}>+</span>
          </div>
        ))}
      </div>
    </div>
  );
}
