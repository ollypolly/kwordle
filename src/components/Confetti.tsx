import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 3,
};

function getAnimationSettings(angle: number, originX: number) {
  return {
    particleCount: 3,
    angle,
    spread: 55,
    origin: { x: originX },
    colors: ["#ffca02", "#eed46c", "#ffffff"],
  };
}

type ConfettiProps = {
  showConfetti?: boolean;
};

export function Confetti({ showConfetti }: ConfettiProps) {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      //@ts-ignore
      refAnimationInstance.current(getAnimationSettings(60, 0));
      //@ts-ignore
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      //@ts-ignore
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    //@ts-ignore
    setIntervalId(null);
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    if (showConfetti) {
      setTimeout(
        () => startAnimation(),
        1300,
        setTimeout(() => pauseAnimation(), 3000)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConfetti]);

  //@ts-ignore
  return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />;
}
