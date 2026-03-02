import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-8"
      style={{
        background:
          "radial-gradient(ellipse at center, #3a0a5e 0%, #1a0a2e 60%, #0d0018 100%)",
      }}
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <h1
          className="text-[64px] glow-gold"
          style={{
            color: "#f5c842",
            fontFamily: "'Press Start 2P', monospace",
            letterSpacing: "0.05em",
          }}
        >
          BALATRO
        </h1>
        <p
          style={{
            color: "#a080d0",
            fontSize: 10,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          open-source web edition
        </p>
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col items-center gap-4">
        <MenuButton to="/blind-select" label="New Run" primary />
        <MenuButton to="/game" label="Continue" />
        <MenuButton to="/" label="Options" />
      </div>

      {/* Version */}
      <p
        className="absolute bottom-6"
        style={{
          color: "#5a4070",
          fontSize: 8,
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        v0.0.1-dev
      </p>
    </div>
  );
}

function MenuButton({
  to,
  label,
  primary,
}: {
  to: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`
        w-64 py-3 text-center rounded border-2 transition-all duration-150
        hover:bg-[#f5c842] hover:text-[#1a0a2e]
        ${
          primary
            ? "border-[#f5c842] text-[#f5c842] bg-[#2a1050]"
            : "border-[#5a3090] text-[#a080d0] bg-[#1a0a2e]"
        }
      `}
      style={{ fontSize: 12, fontFamily: "'Press Start 2P', monospace" }}
    >
      {label}
    </Link>
  );
}
