interface InfoPillProps {
  label: string;
  value: number;
}

function InfoPill({ label, value }: InfoPillProps) {
  return (
    <div className="w-full flex flex-col items-center gap-1 py-2 rounded border border-[#3a2060] bg-[#1e1040]">
      <span
        style={{
          color: "#a080d0",
          fontSize: 7,
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "#ffffff",
          fontSize: 16,
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function RoundInfo() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <InfoPill label="HANDS" value={4} />
      <InfoPill label="DISCARDS" value={3} />
    </div>
  );
}
