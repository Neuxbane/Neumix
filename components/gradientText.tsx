"use client";

import { useState, useEffect } from "react";

interface GradientTextProps {
  text: string;
  StartColor: string;
  EndColor: string;
  AnimationDuration: number;
}

const GradientText: React.FC<GradientTextProps> = ({ text, StartColor, EndColor, AnimationDuration }) => {
  const [visibleChars, setVisibleChars] = useState<string[]>([]);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress((prev) => Math.min(prev + 1, AnimationDuration));
    }, 1000 / AnimationDuration);

    return () => clearInterval(interval);
  }, [AnimationDuration]);

  useEffect(() => {
    const newVisibleChars = text.split("").map((char, index) => {
      const delay = (AnimationDuration / text.length) * index;
      return animationProgress >= delay ? char : "";
    });
    setVisibleChars(newVisibleChars);
  }, [animationProgress, text, AnimationDuration]);

  const gradientStyle = {
    background: `linear-gradient(to right, ${StartColor}, ${EndColor})`,
    backgroundClip: "text",
    fontSize: 'xx-large',
    fontWeight: '600',
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    filter: animationProgress === AnimationDuration ? 'brightness(130%)' : 'brightness(100%)',
  };

  return (
    <span style={{ ...gradientStyle, animation: 'ease-in-out 1s' }}>
      {visibleChars.join("")}
    </span>
  );
};

export default GradientText;
