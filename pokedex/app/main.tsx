import React from "react";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import PokemonList from "../app/page";
import Pokedex from "./pokedex/page";
import Exercise from "./exercise/page";

const HomePage = () => {
  return (
    <ChakraProvider>
      
           <PokemonList />
          <Pokedex />
          <Exercise />
    </ChakraProvider>
  );
};

export default HomePage;