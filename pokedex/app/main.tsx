import React from "react";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import PokemonList from "../app/page";
import Pokedex from "./about/page";

const HomePage = () => {
  return (
    <ChakraProvider>
      
           <PokemonList />
          <Pokedex />
        
    </ChakraProvider>
  );
};

export default HomePage;