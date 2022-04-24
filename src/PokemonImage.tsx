import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@mui/material";

interface Props {
  src: string;
  alt?: string;
}

export const PokemonImage = ({ src, alt }: Props) => {
  return src ? (
    <Image src={src} alt={alt} width={150} height={150} />
  ) : (
    <Skeleton variant="rectangular" width={150} height={150} />
  );
};
