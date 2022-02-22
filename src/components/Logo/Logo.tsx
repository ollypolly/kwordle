import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Flippable } from "../Letter/Flippable";
import { Letter } from "../Letter/Letter";

export function Logo() {
  const theme = useTheme();
  const logoLetters = "KWORDLE".split("");

  const [flipIndex, setFlipIndex] = useState<number | undefined>();

  useEffect(() => {
    const flipGuess = async () => {
      for (const i of Array.from(Array(logoLetters.length).keys())) {
        await setTimeout(() => setFlipIndex(i), i * 120);
      }
    };

    flipGuess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {logoLetters.map((letter, index) => (
        <Flippable
          isLogo
          key={index}
          startFlip={flipIndex !== undefined && flipIndex >= index}
        >
          <Box className="back">
            <Letter
              key={index}
              isLogo
              backgroundColor={theme.palette.primary.main}
              color="#000"
              isText
            >
              {letter}
            </Letter>
          </Box>

          <Box className="front">
            <Letter isLogo borderColor={"#a5a5a55e"} />
          </Box>
        </Flippable>
      ))}
    </Box>
  );
}
