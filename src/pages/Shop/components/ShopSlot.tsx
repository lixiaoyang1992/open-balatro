type SlotType = "joker" | "tarot" | "planet";

interface ShopSlotProps {
  name?: string;
  type?: SlotType;
  price?: number;
  empty?: boolean;
}

const TYPE_COLORS: Record<SlotType, string> = {
  joker: "#f5c842",
  tarot: "#c080f0",
  planet: "#40c0f0",
};

const TYPE_ICONS: Record<SlotType, string> = {
  joker: "🃏",
  tarot: "🔮",
  planet: "🪐",
};

export default function ShopSlot({
  name,
  type,
  price,
  empty = false,
}: ShopSlotProps) {
  if (empty) {
    return (
      <div className="flex flex-col items-center gap-2 opacity-40">
        <div className="w-[90px] h-[120px] rounded-lg border-2 border-dashed border-[#3a2060] bg-[#150828]" />
        <div className="w-16 h-6 rounded bg-[#1e1040] border border-[#3a2060]" />
      </div>
    );
  }

  const resolvedType = type ?? "joker";
  const color = TYPE_COLORS[resolvedType];

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-[90px] h-[120px] rounded-lg border-2 flex flex-col items-center justify-center gap-2 p-2"
        style={{ borderColor: color, backgroundColor: "#1e0a38" }}
      >
        <span style={{ fontSize: 32 }}>{TYPE_ICONS[resolvedType]}</span>
        <span
          style={{
            color,
            fontSize: 7,
            fontFamily: "'Press Start 2P', monospace",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          {name}
        </span>
        <span
          style={{
            color: "#5a4070",
            fontSize: 6,
            fontFamily: "'Press Start 2P', monospace",
            textTransform: "uppercase",
          }}
        >
          {resolvedType}
        </span>
      </div>
      <div
        className="px-3 py-1 rounded border"
        style={{ borderColor: "#f5c842", backgroundColor: "#2a1a00" }}
      >
        <span
          style={{
            color: "#f5c842",
            fontSize: 10,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          ${price ?? 0}
        </span>
      </div>
      <button
        type="button"
        className="px-4 py-1 rounded border border-[#3a8060] bg-[#0a2010] text-[#60d090] hover:bg-[#1a4020] transition-colors"
        style={{ fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}
      >
        Buy
      </button>
    </div>
  );
}
