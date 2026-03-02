import Card from "../../../components/Card";

// TODO: replace with game state
const PLAYED_CARDS = [
  { rank: "A" as const, suit: "♠" as const },
  { rank: "A" as const, suit: "♥" as const },
  { rank: "A" as const, suit: "♦" as const },
];

export default function PlayArea() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center rounded-lg border border-[#3a2060] bg-[#150828] gap-4">
      <p
        style={{
          color: "#5a4070",
          fontSize: 7,
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        PLAYED CARDS
      </p>
      <div className="flex gap-3 items-center">
        {PLAYED_CARDS.map((card) => (
          <Card key={`${card.rank}${card.suit}`} rank={card.rank} suit={card.suit} />
        ))}
      </div>
    </div>
  );
}
