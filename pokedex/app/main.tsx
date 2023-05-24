import React from "react";
import PokemonList from "../app/page";
import { ChakraProvider } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <ChakraProvider>
      
        <PokemonList />
      
    </ChakraProvider>
  );
};

export default HomePage;


