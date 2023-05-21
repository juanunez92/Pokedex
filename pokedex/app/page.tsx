//  I think we can start with:
//Create a new component "PokemonList". For the moment, this component renders a table with static values (let's say: Bulbasaur, Ivysaur and Venusaur), with 3 columns: #id, #image, #name.
// When clicking in one row, we can print in the console a message "console.log('I'm XXXXXXX')"
// Then, we can edit the page.tsx file, remove the default template and just add the component there.
"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<null | any[]>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pokemonDescription, setPokemonDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
      const data = await response.json();
      setPokemons(data.results);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handlePokemonClick = async (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    setModalIsOpen(true);

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
    <div>
      <h1>Tabla de Pokémon</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>URL</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {pokemons &&
            pokemons.map((pokemon, index) => (
              <tr key={index} onClick={() => handlePokemonClick(pokemon.name)}>
                <td>{pokemon.name}</td>
                <td>{pokemon.url}</td>
                <td>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                      index + 1
                    }.png`}
                    alt=""
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Has seleccionado:</h2>
        <p>{selectedPokemon}</p>
        <h2>Esta es la descripción del Pokemon:</h2>
        <p>{pokemonDescription}</p>
        <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default PokemonList;
