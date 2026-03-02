import { Link } from "react-router-dom";
import ShopSlot from "./components/ShopSlot";
import PackSlot from "./components/PackSlot";

const MOCK_COINS = 4;

export default function Shop() {
  return (
    <div className="w-full h-full flex flex-col bg-[#1a0a2e]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 bg-[#0d0018] border-b border-[#3a2060]">
        <h2
          style={{
            color: "#f5c842",
            fontSize: 18,
          }}
        >
          SHOP
        </h2>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 20 }}>🪙</span>
          <span
            style={{
              color: "#f5c842",
              fontSize: 18,
            }}
          >
            ${MOCK_COINS}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 gap-8 px-10 py-8">
        {/* Left: Items for sale */}
        <div className="flex flex-col gap-4 flex-1">
          <p
            style={{
              color: "#a080d0",
              fontSize: 8,
            }}
          >
            FOR SALE
          </p>
          <div className="flex gap-6 items-start">
            <ShopSlot name="Scary Face" type="joker" price={6} />
            <ShopSlot name="Death" type="tarot" price={3} />
            <ShopSlot name="Mercury" type="planet" price={3} />
            <ShopSlot empty name="" type="joker" price={0} />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-[#3a2060]" />

        {/* Right: Booster Packs */}
        <div className="flex flex-col gap-4 min-w-[240px]">
          <p
            style={{
              color: "#a080d0",
              fontSize: 8,
            }}
          >
            BOOSTER PACKS
          </p>
          <div className="flex gap-6 items-start">
            <PackSlot
              name="Arcana Pack"
              price={4}
              description="Choose 1 of 3 Tarot cards"
            />
            <PackSlot
              name="Standard Pack"
              price={4}
              description="Choose 1 of 3 playing cards"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-8 py-4 bg-[#0d0018] border-t border-[#3a2060]">
        <Link
          to="/game"
          style={{
            color: "#5a4070",
            fontSize: 8,
          }}
          className="hover:text-[#a080d0] transition-colors"
        >
          ← Back to Game
        </Link>
        <Link
          to="/blind-select"
          className="px-8 py-3 rounded border-2 border-[#f5c842] bg-[#2a1a00] text-[#f5c842] hover:bg-[#3a2800] transition-colors"
          style={{ fontSize: 10 }}
        >
          Next Round →
        </Link>
      </div>
    </div>
  );
}
