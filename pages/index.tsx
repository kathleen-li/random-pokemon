import * as React from "react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { PokemonImage } from "../src/PokemonImage";

const Pokemon: NextPage = () => {
  const [id, setId] = useState("1");
  const [tempId, setTempId] = useState("1");
  const [spriteFront, setSpriteFront] = useState("");
  const [spriteBack, setSpriteBack] = useState("");
  const [spriteName, setSpriteName] = useState("");
  const [spriteType1, setSpriteType1] = useState("");
  const [spriteType2, setSpriteType2] = useState<string | null>(null);

  useEffect(() => {
    setSpriteFront("");
    setSpriteBack("");
    axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then(({ data }) => {
      setSpriteFront(data.sprites.front_default);
      setSpriteBack(data.sprites.back_default);
      setSpriteName(data.species.name);
      setSpriteType1(data.types[0].type.name);
      if (data.types[1]) {
        setSpriteType2(data.types[1].type.name);
      } else {
        setSpriteType2(null);
      }
    });
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Paper elevation={4} sx={{ width: "80vw", height: "80vh" }}>
        <Box mt={2}>
          <Typography variant="h3" textAlign="center">
            Find Your Pokemon
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PokemonImage src={spriteFront} alt="pokemon sprite front" />
          <PokemonImage src={spriteBack} alt="pokemon sprite back" />
        </Box>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {spriteName}
        </Typography>
        <Box display="flex" justifyContent="center">
          <Typography component="span" mx={1}>
            {spriteType1}
          </Typography>
          {spriteType2 && (
            <Typography component="span" mx={1}>
              {spriteType2}
            </Typography>
          )}
        </Box>
        <Box my={2} sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            label="id"
            type="number"
            value={tempId}
            onChange={(e) => {
              if (e.target.value.includes(".")) return;
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= 151) {
                setTempId(e.target.value);
              }
            }}
          />
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            onClick={() => {
              setId(tempId);
            }}
          >
            Go
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              const num = `${Math.floor(Math.random() * 151) + 1}`;
              setId(num);
              setTempId(num);
            }}
          >
            Random
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Pokemon;
