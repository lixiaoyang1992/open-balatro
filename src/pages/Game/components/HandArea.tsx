import Card from "../../../components/Card";

// TODO: replace with game state
const HAND_CARDS = [
  { rank: "A" as const, suit: "♠" as const, selected: true },
  { rank: "K" as const, suit: "♥" as const, selected: false },
  { rank: "Q" as const, suit: "♦" as const, selected: false },
  { rank: "J" as const, suit: "♣" as const, selected: false },
  { rank: "10" as const, suit: "♠" as const, selected: true },
  { rank: "9" as const, suit: "♥" as const, selected: true },
  { rank: "8" as const, suit: "♦" as const, selected: false },
  { rank: "7" as const, suit: "♣" as const, selected: false },
];

export default function HandArea() {
  return (
    <div className="flex items-end justify-center gap-1 px-4 h-[120px]">
      {HAND_CARDS.map((card) => (
        <Card
          key={`${card.rank}${card.suit}`}
          rank={card.rank}
          suit={card.suit}
          selected={card.selected}
          small
        />
      ))}
    </div>
  );
}
