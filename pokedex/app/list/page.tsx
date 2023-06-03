"use client";

import { ChakraProvider } from "@chakra-ui/react";
import Counter from "./listPoke";
import PokemonList from "./listPoke";

const Exercise = () => {
  return (
    <>
      <ChakraProvider>
        
        <PokemonList />
      </ChakraProvider>
    </>
  );
};

export default Exercise;
