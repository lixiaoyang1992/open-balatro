import ScorePanel from "./components/ScorePanel";
import JokerBar from "./components/JokerBar";
import ConsumablesBar from "./components/ConsumablesBar";
import PlayArea from "./components/PlayArea";
import HandTypeDisplay from "./components/HandTypeDisplay";
import RoundInfo from "./components/RoundInfo";
import HandArea from "./components/HandArea";
import ActionButtons from "./components/ActionButtons";

export default function Game() {
  return (
    <div className="w-full h-full flex flex-col bg-[#1a0a2e]">
      {/* Top bar: Joker slots + consumables */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d0018] border-b border-[#3a2060] h-[100px]">
        <JokerBar />
        <ConsumablesBar />
      </div>

      {/* Middle: ScorePanel + PlayArea + RoundInfo */}
      <div className="flex flex-1 gap-3 p-3 overflow-hidden">
        <ScorePanel />

        {/* Play Area */}
        <PlayArea />

        {/* Right: HandType + RoundInfo */}
        <div
          className="flex flex-col items-center justify-between rounded-lg border border-[#3a2060] bg-[#150828] p-4 w-[160px]"
        >
          <HandTypeDisplay />
          <RoundInfo />
        </div>
      </div>

      {/* Bottom: Hand + Action buttons */}
      <div className="flex flex-col items-center bg-[#0d0018] border-t border-[#3a2060]">
        <HandArea />
        <ActionButtons />
      </div>
    </div>
  );
}
