"use client";
import React, { useState, useEffect } from "react";

export default function page() {
  const [searchName, setSearchName] = useState("");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form className=" border border-gray-300 rounded-md p-2">
        <label className="align-middle mr-2" htmlFor="searchName ">
          Pokemon Name
        </label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-white bg-transparent"
        />
      </form>
      <PokemonCard pokemon={searchName} />
    </div>
  );
}

function PokemonCard({ pokemon = "" }) {
  const [pokemonManagement, setPokemonManagement] = useState({
    pokemonData: null,
    status: "idle",
    error: null,
  });
  const { pokemonData, status, error } = pokemonManagement;

  //this is a side effect
  useEffect(() => {
    async function fetchPokemon() {
      console.log("fetching pokemon");
      if (!pokemon) {
        setPokemonManagement({
          pokemonData: null,
          status: "idle",
          error: null,
        });
        return;
      }
      // make isLoading true
      setPokemonManagement({
        status: "pending",
      });
      // fetch the pokemon
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        const data = await response.json();
        setPokemonManagement({
          ...pokemonManagement,
          pokemonData: data,
          status: "success",
          error: null,
        });
      } catch (err) {
        setPokemonManagement({
          pokemonData: null,
          status: "rejected",
          error: err,
        });
      }
    }
    let timer = setTimeout(() => {
      fetchPokemon();
    }, 1500);
    return () => clearTimeout(timer);
  }, [pokemon]);

  if (status === "idle") {
    return (
      <div>
        <h1>write a pokemon name</h1>
      </div>
    );
  } else if (status === "pending") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (status === "rejected") {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex mt-10 flex-col items-center justify-center border border-gray-300 rounded-md p-2 shadow-md">
        <h1 className="text-2xl font-bold">{pokemonData.name}</h1>
        <img
          className="w-100 h-100 rounded-md"
          src={pokemonData?.sprites?.front_default}
          alt={pokemonData?.name}
        />
        <p className="text-sm">Height: {pokemonData?.height}</p>
        <p className="text-sm">Weight: {pokemonData.weight}</p>
        <p className="text-sm">
          Base Experience: {pokemonData.base_experience}
        </p>
      </div>
    </div>
  );
}
