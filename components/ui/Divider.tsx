type DividerProps = {
  from?: "navy" | "cream" | "ink";
  to?: "navy" | "cream" | "ink";
  variant?: "wave" | "diagonal";
};

const colors = {
  navy: "#14213D",
  cream: "#FFF6EA",
  ink: "#0E0E10",
};

export function Divider({
  from = "navy",
  to = "cream",
  variant = "wave",
}: DividerProps) {
  if (variant === "diagonal") {
    return (
      <div
        className="h-8 w-full md:h-12"
        style={{
          background: `linear-gradient(to bottom right, ${colors[from]} 49.5%, ${colors[to]} 50.5%)`,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="leading-[0]" aria-hidden="true">
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="block h-8 w-full md:h-12"
      >
        <path
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
          fill={colors[to]}
        />
        <rect width="1440" height="32" fill={colors[from]} />
        <path
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,0 L0,0 Z"
          fill={colors[from]}
        />
      </svg>
    </div>
  );
}
