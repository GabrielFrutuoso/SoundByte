import type React from "react"
import { cn } from "@/lib/utils"

interface StyledRangeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function RangeInput({ className, ...props }: StyledRangeInputProps) {
  return (
    <input
      type="range"
      className={cn(
        "w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-primary",
        "dark:bg-secondary dark:focus:ring-primary",
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer",
        "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none",
        "dark:[&::-webkit-slider-thumb]:bg-primary dark:[&::-moz-range-thumb]:bg-primary",
        className,
      )}
      {...props}
    />
  )
}

