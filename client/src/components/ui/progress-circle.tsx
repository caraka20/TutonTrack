// src/components/ui/progress-circle.tsx
"use client"

import * as React from "react"

type Props = { size?: number; stroke?: number; value: number; label?: string }
export function ProgressCircle({ size = 80, stroke = 8, value, label }: Props) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(100, value))
  const dash = (clamped / 100) * c

  return (
    <div className="inline-flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="text-muted/30" stroke="currentColor" fill="transparent" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          className="text-primary"
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={`${dash} ${c - dash}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-2 text-center">
        <div className="text-lg font-semibold">{clamped}%</div>
        {label && <div className="text-xs text-muted-foreground">{label}</div>}
      </div>
    </div>
  )
}
