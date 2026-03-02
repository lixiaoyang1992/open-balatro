import JokerCard from "../../../components/JokerCard";

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
        style={{
          color: "#a080d0",
          fontSize: 8,
          fontFamily: "'Press Start 2P', monospace",
          marginRight: 8,
        }}
      >
        JOKERS
      </p>
      {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
        const joker = MOCK_JOKERS[i];
        return joker ? (
          <JokerCard key={i} name={joker.name} />
        ) : (
          <JokerCard key={i} empty />
        );
      })}
    </div>
  );
}
