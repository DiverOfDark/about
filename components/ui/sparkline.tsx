type Props = {
  points: number[];
  color?: string;
  width?: number;
  height?: number;
  fill?: boolean;
};

export function Sparkline({
  points,
  color = "var(--accent)",
  width = 120,
  height = 28,
  fill = false,
}: Props) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => [
    i * step,
    height - 2 - ((p - min) / range) * (height - 4),
  ]);
  const d = "M " + coords.map((c) => c.join(" ")).join(" L ");
  const fillPath = d + ` L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      {fill && <path d={fillPath} fill={color} opacity={0.1} />}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
    </svg>
  );
}
