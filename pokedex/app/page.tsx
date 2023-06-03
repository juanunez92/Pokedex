'use client'
import React from "react";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import PokemonList from "./list/listPoke";


const HomePage = () => {
  return (
    <ChakraProvider>
          <PokemonList />
    </ChakraProvider>
  );
};

export default HomePage;