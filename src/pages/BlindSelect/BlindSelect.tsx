import { Link } from "react-router-dom";

interface Blind {
  id: string;
  name: string;
  target: number;
  reward: number;
  description: string;
  color: string;
  boss: boolean;
}

const BLINDS: Blind[] = [
  {
    id: "small",
    name: "Small Blind",
    target: 300,
    reward: 3,
    description: "No special effect",
    color: "#a0c040",
    boss: false,
  },
  {
    id: "big",
    name: "Big Blind",
    target: 900,
    reward: 4,
    description: "No special effect",
    color: "#f5c842",
    boss: false,
  },
  {
    id: "boss",
    name: "The Wall",
    target: 2000,
    reward: 5,
    description: "All played cards have -1 Hand Size",
    color: "#e03030",
    boss: true,
  },
];

export default function BlindSelect() {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center"
      style={{
        background:
          "radial-gradient(ellipse at center, #2a0a4e 0%, #1a0a2e 100%)",
      }}
    >
      {/* Header */}
      <div className="mt-12 mb-10 flex flex-col items-center gap-2">
        <p
          style={{
            color: "#a080d0",
            fontSize: 9,
          }}
        >
          ANTE 1 / 8
        </p>
        <h2
          style={{
            color: "#f5c842",
            fontSize: 20,
          }}
        >
          Select Blind
        </h2>
      </div>

      {/* Blind Cards */}
      <div className="flex gap-8 items-start">
        {BLINDS.map((blind) => (
          <BlindCard key={blind.id} blind={blind} />
        ))}
      </div>

      {/* Back */}
      <Link
        to="/"
        className="absolute bottom-8 left-8 text-[#5a4070] hover:text-[#a080d0]"
        style={{ fontSize: 9 }}
      >
        ← Back
      </Link>
    </div>
  );
}

function BlindCard({ blind }: { blind: Blind }) {
  return (
    <div
      className={`flex flex-col items-center gap-4 p-6 rounded-xl border-2 w-[220px] ${blind.boss ? "glow-red" : ""}`}
      style={{
        borderColor: blind.color,
        backgroundColor: blind.boss ? "#2a0808" : "#1e0a38",
      }}
    >
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border-2"
        style={{
          borderColor: blind.color,
          backgroundColor: blind.boss ? "#3a0808" : "#2a1050",
        }}
      >
        {blind.boss ? "💀" : "🎯"}
      </div>

      {/* Name */}
      <h3
        style={{
          color: blind.color,
          fontSize: 10,
          textAlign: "center",
        }}
      >
        {blind.name}
      </h3>

      {/* Target */}
      <div className="flex flex-col items-center gap-1">
        <p
          style={{
            color: "#a080d0",
            fontSize: 8,
          }}
        >
          Score at least
        </p>
        <p
          style={{
            color: "#ffffff",
            fontSize: 16,
          }}
        >
          {blind.target.toLocaleString()}
        </p>
      </div>

      {/* Description */}
      {blind.boss && (
        <p
          style={{
            color: "#e07070",
            fontSize: 7,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          {blind.description}
        </p>
      )}

      {/* Reward */}
      <div className="flex items-center gap-1">
        <span
          style={{
            fontSize: 8,
            color: "#a080d0",
          }}
        >
          Reward:
        </span>
        <span
          style={{
            fontSize: 10,
            color: "#f5c842",
          }}
        >
          ${blind.reward}
        </span>
      </div>

      {/* Select Button */}
      <Link
        to="/game"
        className="w-full py-2 text-center rounded border-2 hover:opacity-80 transition-opacity"
        style={{
          borderColor: blind.color,
          color: blind.color,
          fontSize: 9,
        }}
      >
        Select
      </Link>

      {/* Skip (non-boss only) */}
      {!blind.boss && (
        <span
          style={{
            color: "#3a2048",
            fontSize: 8,
          }}
        >
          Skip →
        </span>
      )}
    </div>
  );
}
