"use client";

type Props = {
  value: number;       // 0..100
  size?: number;       // px
  strokeWidth?: number;// px
};

export default function ProgressCircle({ value, size = 72, strokeWidth = 8 }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={strokeWidth} className="text-muted/20" stroke="currentColor" fill="transparent" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={strokeWidth}
        className="text-primary"
        stroke="currentColor"
        fill="transparent"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-xs fill-foreground">
        {Math.round(pct)}%
      </text>
    </svg>
  );
}
