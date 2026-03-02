interface CardProps {
  rank: string;
  suit: "♠" | "♥" | "♦" | "♣";
  faceDown?: boolean;
  selected?: boolean;
  small?: boolean;
}

const redSuits = new Set(["♥", "♦"]);

export default function Card({
  rank,
  suit,
  faceDown = false,
  selected = false,
  small = false,
}: CardProps) {
  const isRed = redSuits.has(suit);
  const suitColor = isRed ? "#e03030" : "#1a1a2e";
  const width = small ? 52 : 70;
  const height = small ? 73 : 98;

  if (faceDown) {
    return (
      <div
        style={{ width, height }}
        className="rounded-lg border-2 border-[#3a2060] bg-[#2a1050] flex items-center justify-center flex-shrink-0"
      >
        <div className="w-3/4 h-3/4 border border-[#5a3090] rounded" />
      </div>
    );
  }

  return (
    <div
      style={{
        width,
        height,
        outline: selected ? "2px solid #f5c842" : "none",
        outlineOffset: 2,
      }}
      className={`
        rounded-lg border-2 border-[#cccccc] bg-white flex flex-col justify-between p-1 flex-shrink-0
        ${selected ? "-translate-y-2" : ""}
        transition-transform duration-100
      `}
    >
      {/* Top-left rank + suit */}
      <div
        className="flex flex-col items-start leading-none"
        style={{
          color: suitColor,
          fontSize: small ? 9 : 11,
          fontFamily: "monospace",
        }}
      >
        <span className="font-bold">{rank}</span>
        <span>{suit}</span>
      </div>
      {/* Center suit */}
      <div
        className="flex items-center justify-center"
        style={{ color: suitColor, fontSize: small ? 20 : 28 }}
      >
        {suit}
      </div>
      {/* Bottom-right rank + suit (rotated) */}
      <div
        className="flex flex-col items-end leading-none rotate-180"
        style={{
          color: suitColor,
          fontSize: small ? 9 : 11,
          fontFamily: "monospace",
        }}
      >
        <span className="font-bold">{rank}</span>
        <span>{suit}</span>
      </div>
    </div>
  );
}
