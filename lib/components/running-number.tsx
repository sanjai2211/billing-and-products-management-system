import React, { useEffect, useState } from "react";

interface RunningNumberProps {
  endNumber: number; // Number to count up to
  startNumber?: number; // Number to count up to
  duration: number; // Duration in seconds
  fontSize?: string; // Tailwind font size class
  startColor?: string; // Tailwind start color class
  endColor?: string; // Tailwind end color class
}

export const RunningNumber: React.FC<RunningNumberProps> = ({
  endNumber,
  duration = 2,
  startNumber = 0,
  fontSize = "text-3xl", // Default font size
  startColor = "text-blue-500", // Default start color
  endColor = "text-red-500", // Default end color
}) => {
  const [currentNumber, setCurrentNumber] = useState(startNumber);

  useEffect(() => {
    if (endNumber <= 0 || duration <= 0) return;

    const increment = endNumber / (duration * 1000); // Calculate the increment per millisecond
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const newNumber = Math.min(
        Math.floor(elapsedTime * increment),
        endNumber
      ); // Ensure it doesn't go beyond endNumber
      setCurrentNumber(newNumber);

      if (newNumber < endNumber) {
        requestAnimationFrame(animate); // Continue animation if we haven't reached the end number
      }
    };

    requestAnimationFrame(animate); // Start the animation
  }, [endNumber, duration]);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`font-bold ${fontSize} ${startColor} transition-all duration-${
          duration * 1000
        }`}
        style={{ transitionProperty: "color", color: endColor }}
      >
        {currentNumber || 0}
      </div>
    </div>
  );
};

export const RunningNumberWithText = (props: any) => {
  const { textContent, leftSymbol, rightSymbol, ...rest } = props;
  return (
    <div className="flex flex-col justify-center w-full h-full flex-1">
      <div className="flex gap-1 items-center justify-center">
        {leftSymbol && <p className="text-sm">{leftSymbol}</p>}
        <RunningNumber {...rest} />
        {rightSymbol && <p className="text-sm">{rightSymbol}</p>}
      </div>
      <p className="text-center text-xs opacity-50">{textContent}</p>
    </div>
  );
};
