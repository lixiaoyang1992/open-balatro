interface ScorePanelProps {
  blindName?: string;
  scoreTarget?: number;
  currentScore?: number;
  coins?: number;
  ante?: number;
  totalAntes?: number;
  round?: number;
}

export default function ScorePanel({
  blindName = "Small Blind",
  scoreTarget = 300,
  currentScore = 0,
  coins = 4,
  ante = 1,
  totalAntes = 8,
  round = 1,
}: ScorePanelProps) {
  return (
    <div
      className="flex flex-col items-center gap-3 p-4 rounded-lg border border-[#3a2060] bg-[#150828] h-full w-[180px]"
    >
      {/* Blind name */}
      <div className="flex flex-col items-center gap-1">
        <p
          style={{
            color: "#a080d0",
            fontSize: 7,
          }}
        >
          BLIND
        </p>
        <p
          style={{
            color: "#f5c842",
            fontSize: 9,
            textAlign: "center",
          }}
        >
          {blindName}
        </p>
      </div>

      <hr className="w-full border-[#3a2060]" />

      {/* Score target */}
      <div className="flex flex-col items-center gap-1">
        <p
          style={{
            color: "#a080d0",
            fontSize: 7,
          }}
        >
          SCORE AT LEAST
        </p>
        <p
          style={{
            color: "#ffffff",
            fontSize: 14,
          }}
        >
          {scoreTarget}
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
          }}
        >
          ROUND SCORE
        </p>
        <p
          style={{
            color: "#f5c842",
            fontSize: 20,
          }}
        >
          {currentScore}
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
          }}
        >
          ${coins}
        </span>
      </div>

      {/* Ante info */}
      <div className="mt-auto flex flex-col items-center gap-1">
        <p
          style={{
            color: "#5a4070",
            fontSize: 7,
          }}
        >
          ANTE {ante}/{totalAntes}
        </p>
        <p
          style={{
            color: "#5a4070",
            fontSize: 7,
          }}
        >
          ROUND {round}
        </p>
      </div>
    </div>
  );
}
