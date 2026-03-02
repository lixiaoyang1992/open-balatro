export default function ScorePanel() {
  return (
    <div
      className="flex flex-col items-center gap-3 p-4 rounded-lg border border-[#3a2060] bg-[#150828]"
      style={{ width: 180, height: "100%" }}
    >
      {/* Blind name */}
      <div className="flex flex-col items-center gap-1">
        <p
          style={{
            color: "#a080d0",
            fontSize: 7,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          BLIND
        </p>
        <p
          style={{
            color: "#f5c842",
            fontSize: 9,
            fontFamily: "'Press Start 2P', monospace",
            textAlign: "center",
          }}
        >
          Small Blind
        </p>
      </div>

      <hr className="w-full border-[#3a2060]" />

      {/* Score target */}
      <div className="flex flex-col items-center gap-1">
        <p
          style={{
            color: "#a080d0",
            fontSize: 7,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          SCORE AT LEAST
        </p>
        <p
          style={{
            color: "#ffffff",
            fontSize: 14,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          300
        </p>
      </div>

      {/* Current score */}
      <div
        className="flex flex-col items-center gap-1 w-full py-3 rounded-lg border border-[#f5c842]"
        style={{ background: "#1e1040" }}
      >
        <p
          style={{
            color: "#a080d0",
            fontSize: 7,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          ROUND SCORE
        </p>
        <p
          style={{
            color: "#f5c842",
            fontSize: 20,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          0
        </p>
      </div>

      <hr className="w-full border-[#3a2060]" />

      {/* Coins */}
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 16 }}>🪙</span>
        <span
          style={{
            color: "#f5c842",
            fontSize: 14,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          $4
        </span>
      </div>

      {/* Ante info */}
      <div className="mt-auto flex flex-col items-center gap-1">
        <p
          style={{
            color: "#5a4070",
            fontSize: 7,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          ANTE 1/8
        </p>
        <p
          style={{
            color: "#5a4070",
            fontSize: 7,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          ROUND 1
        </p>
      </div>
    </div>
  );
}
