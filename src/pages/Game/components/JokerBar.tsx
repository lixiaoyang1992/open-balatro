import JokerCard from "../../../components/JokerCard";

// TODO: replace with game state
const MOCK_JOKERS = [
  { name: "Joker" },
  { name: "Greedy Joker" },
  { name: "Wrathful Joker" },
];

const TOTAL_SLOTS = 5;

export default function JokerBar() {
  return (
    <div className="flex items-center gap-3 flex-1">
      <p
        className="mr-2"
        style={{
          color: "#a080d0",
          fontSize: 8,
        }}
      >
        JOKERS
      </p>
      {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
        const joker = MOCK_JOKERS[i];
        return joker ? (
          <JokerCard key={joker.name} name={joker.name} />
        ) : (
          <JokerCard key={`empty-slot-${i}`} empty />
        );
      })}
    </div>
  );
}
