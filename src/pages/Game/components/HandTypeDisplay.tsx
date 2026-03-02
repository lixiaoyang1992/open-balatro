export default function HandTypeDisplay() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p
        style={{
          color: "#a080d0",
          fontSize: 7,
        }}
      >
        HAND
      </p>
      <p
        style={{
          color: "#f5c842",
          fontSize: 11,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        Three of a Kind
      </p>
      <div className="flex gap-2 mt-1">
        <div className="flex flex-col items-center">
          <span
            style={{
              color: "#a080d0",
              fontSize: 7,
            }}
          >
            ×
          </span>
          <span
            style={{
              color: "#ffffff",
              fontSize: 12,
            }}
          >
            30
          </span>
          <span
            style={{
              color: "#5a4070",
              fontSize: 6,
            }}
          >
            chips
          </span>
        </div>
        <span
          style={{
            color: "#f5c842",
            fontSize: 16,
            alignSelf: "center",
          }}
        >
          ×
        </span>
        <div className="flex flex-col items-center">
          <span
            style={{
              color: "#a080d0",
              fontSize: 7,
            }}
          >
            ×
          </span>
          <span
            style={{
              color: "#f5c842",
              fontSize: 12,
            }}
          >
            3
          </span>
          <span
            style={{
              color: "#5a4070",
              fontSize: 6,
            }}
          >
            mult
          </span>
        </div>
      </div>
    </div>
  );
}
