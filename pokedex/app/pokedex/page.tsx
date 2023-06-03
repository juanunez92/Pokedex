"use client";

import { ChakraProvider } from "@chakra-ui/react";
import Counter from "./pokedex";
import Pokedex from "./pokedex";

const Exercise = () => {
  return (
    <>
      <ChakraProvider>
        <Pokedex />
      </ChakraProvider>
    </>
  );
};

export default Exercise;
