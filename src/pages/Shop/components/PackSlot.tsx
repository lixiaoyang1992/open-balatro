interface PackSlotProps {
  name: string;
  price: number;
  description: string;
}

export default function PackSlot({ name, price, description }: PackSlotProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-[100px] h-[70px] rounded-lg border-2 border-[#8060c0] bg-[#1e1040] flex flex-col items-center justify-center gap-1 p-2">
        <span style={{ fontSize: 24 }}>🎁</span>
        <span
          style={{
            color: "#c0a0f0",
            fontSize: 7,
            textAlign: "center",
          }}
        >
          {name}
        </span>
      </div>
      <span
        style={{
          color: "#8060a0",
          fontSize: 6,
          textAlign: "center",
          maxWidth: 100,
          lineHeight: 1.5,
        }}
      >
        {description}
      </span>
      <div className="flex items-center gap-2">
        <span
          style={{
            color: "#f5c842",
            fontSize: 9,
          }}
        >
          ${price}
        </span>
        <button
          type="button"
          className="px-3 py-1 rounded border border-[#3a8060] bg-[#0a2010] text-[#60d090] hover:bg-[#1a4020] transition-colors"
          style={{ fontSize: 7 }}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
