import ScorePanel from "./components/ScorePanel";
import JokerBar from "./components/JokerBar";

export default function Game() {
  return (
    <div className="w-full h-full flex flex-col bg-[#1a0a2e]">
      {/* Top bar: Joker slots + consumables */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d0018] border-b border-[#3a2060] h-[100px]">
        <JokerBar />
        <div className="flex flex-col items-end gap-1">
          <p
            style={{
              color: "#a080d0",
              fontSize: 7,
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            CONSUMABLES
          </p>
          <div className="flex gap-2">
            <div className="w-[52px] h-[52px] rounded border border-dashed border-[#3a2060] flex items-center justify-center">
              <span style={{ color: "#3a2060", fontSize: 18 }}>+</span>
            </div>
            <div className="w-[52px] h-[52px] rounded border border-dashed border-[#3a2060] flex items-center justify-center">
              <span style={{ color: "#3a2060", fontSize: 18 }}>+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle: ScorePanel + PlayArea + RoundInfo */}
      <div className="flex flex-1 gap-3 p-3 overflow-hidden">
        <ScorePanel />

        {/* Play Area */}
        <div className="flex-1 flex flex-col items-center justify-center rounded-lg border border-[#3a2060] bg-[#150828]">
          <span
            style={{
              color: "#5a4070",
              fontSize: 9,
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            [PlayArea — Task 9]
          </span>
        </div>

        {/* Right: HandType + RoundInfo */}
        <div
          className="flex flex-col items-center justify-between rounded-lg border border-[#3a2060] bg-[#150828] p-4 w-[160px]"
        >
          <span
            style={{
              color: "#5a4070",
              fontSize: 9,
              fontFamily: "'Press Start 2P', monospace",
              textAlign: "center",
            }}
          >
            [HandType + RoundInfo — Task 9]
          </span>
        </div>
      </div>

      {/* Bottom: Hand + Action buttons */}
      <div className="flex flex-col items-center px-4 pb-3 bg-[#0d0018] border-t border-[#3a2060]">
        <div className="flex items-center justify-center h-[120px]">
          <span
            style={{
              color: "#5a4070",
              fontSize: 9,
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            [HandArea — Task 10]
          </span>
        </div>
        <div className="flex gap-8">
          <span
            style={{
              color: "#5a4070",
              fontSize: 9,
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            [ActionButtons — Task 10]
          </span>
        </div>
      </div>
    </div>
  );
}
