import React from "react";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import PokemonList from "../app/page";
import Pokedex from "../app/pokedex";

const HomePage = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default HomePage;