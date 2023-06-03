//  I think we can start with:
//Create a new component "PokemonList". For the moment, this component renders a table with static values (let's say: Bulbasaur, Ivysaur and Venusaur), with 3 columns: #id, #image, #name.
// When clicking in one row, we can print in the console a message "console.log('I'm XXXXXXX')"
// Then, we can edit the page.tsx file, remove the default template and just add the component there.
"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import {useRouter} from 'next/router';

import {
  ChakraProvider,
  extendTheme,
  Image,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tfoot,
  TableCaption,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select,
  
} from "@chakra-ui/react";

const pURL = 'http://localhost:3000/pokedex/${id}';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<null | any[]>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pokemonDescription, setPokemonDescription] = useState("");
  const [Page, setPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const PageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(Number(event.target.value));
    setCurrentPage(1);
  };
  useEffect(() => {
    fetchData(currentPage, Page);
  }, [currentPage, Page]);

  const fetchData = async (currenPage: number, Page: number) => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=251"
      );
      const data = await response.json();
      const startPage = (currentPage - 1) * Page;
      const endPage = startPage + Page;
      const paginatedPokemons = data.results.slice(startPage, endPage);
      setPokemons(paginatedPokemons);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handlePokemonClick = async (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    setModalIsOpen(true);
    setCurrentPage(1);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
      );
      const data = await response.json();
      const description = data.flavor_text_entries.find(
        (entry: any) => entry.language.name === "es"
      ).flavor_text;
      setPokemonDescription(description);
    } catch (error) {
      console.log("Error fetching description:", error);
    }
  };

  return (
    <Box>
      <Box as="h1" fontSize="100px" mb={50}>
        Tabla de Pokémon
      </Box>
      <Box><Button><Link href="/pokedex">PULSAR E IR A LA OTRA PÁGINA</Link></Button></Box>
      <Box>Cantidad de Pokemones</Box>
      <Select value={Page} onChange={PageChange}>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={150}>150</option>
      </Select>
      <Button
        fontSize="20px"
        height="48px"
        width="200px"
        border="2px"
        colorScheme="red"
        mt={5}
        mb={5}
        onClick={() => setCurrentPage(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Página anterior
      </Button>
      <Button
        fontSize="20px"
        height="48px"
        width="200px"
        border="2px"
        colorScheme="red"
        mt={5}
        mb={5}
        ml={5}
        onClick={() => setCurrentPage(currentPage + 1)}
        isDisabled={!pokemons || pokemons.length < Page || currentPage === Math.ceil(251 / Page)}
      >
        Siguiente página
      </Button>

      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>URL</Th>
            <Th>Imagen</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pokemons &&
            pokemons.map((pokemon, index) => {
              const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

              return (
                <Tr
                  key={index}
                  onClick={() => handlePokemonClick(pokemon.name)}
                >
                  <Td>{pokemon.name}</Td>
                  <Td>{pokemon.url}</Td>
                  <Td>
                    <Image
                      key={pokemon.name}
                      boxSize="150px"
                      src={imageUrl}
                      alt="Pokemon"
                    />
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <Drawer
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent bg="white" maxW="600px">
          <DrawerHeader
            fontSize="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={0}
          ></DrawerHeader>
          <DrawerBody>
            <Box as="h2" fontSize="50px" mb={5}>
              Has seleccionado:
            </Box>
            <Box>{selectedPokemon}</Box>
            <Box as="h2" fontSize="50px" mb={20}>
              Descripción del Pokemon:
            </Box>
            <Box>{pokemonDescription}</Box>
            <Button
              fontSize="20px"
              height="48px"
              width="200px"
              border="2px"
              borderColor="green.500"
              colorScheme="red"
              mb={20}
              onClick={() => setModalIsOpen(false)}
            >
              Cerrar
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default PokemonList;
