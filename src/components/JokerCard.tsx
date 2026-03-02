interface JokerCardProps {
  name?: string;
  empty?: boolean;
}

export default function JokerCard({ name, empty = false }: JokerCardProps) {
  if (empty) {
    return (
      <div className="w-[80px] h-[80px] rounded-lg border-2 border-dashed border-[#3a2060] bg-[#1a0a2e] flex items-center justify-center flex-shrink-0">
        <span className="text-[#3a2060] text-[10px]">+</span>
      </div>
    );
  }

  return (
    <div className="w-[80px] h-[80px] rounded-lg border-2 border-[#f5c842] bg-[#2a1050] flex flex-col items-center justify-center gap-1 flex-shrink-0 p-1">
      {/* Joker icon placeholder */}
      <div className="w-10 h-10 rounded-full bg-[#3a2060] flex items-center justify-center text-[#f5c842] text-lg">
        🃏
      </div>
      {name && (
        <span
          className="text-[7px] text-[#f5c842] text-center leading-tight line-clamp-2"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          {name}
        </span>
      )}
    </div>
  );
}
