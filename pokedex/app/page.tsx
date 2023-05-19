//  I think we can start with:
//Create a new component "PokemonList". For the moment, this component renders a table with static values (let's say: Bulbasaur, Ivysaur and Venusaur), with 3 columns: #id, #image, #name.
// When clicking in one row, we can print in the console a message "console.log('I'm XXXXXXX')"
// Then, we can edit the page.tsx file, remove the default template and just add the component there.
'use client'
import React, { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<null | any[]>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();
      setPokemons(data.results);
    } catch (error) {
      console.log('Error fetching data:', error);
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
          </tr>
        </thead>
        <tbody>
          {pokemons && pokemons.map((pokemon, index) => (
            <tr key={index}>
              <td>{pokemon.name}</td>
              <td>{pokemon.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonList;
