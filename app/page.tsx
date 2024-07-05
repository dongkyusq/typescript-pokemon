"use client";

import Link from "next/link";
import getPokemon, { Pokemon } from "./api/pokemons/route";
import { useEffect, useState } from "react";
import { resolve } from "path";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function fetchPokemon() {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = await getPokemon();
      setPokemons(data);
    }
    fetchPokemon();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 list-none p-0">
        {pokemons.map((pokemon: Pokemon) => (
          <li
            key={pokemon.id}
            className="border border-gray-800 rounded-lg overflow-hidden w-36 bg-white shadow-md"
          >
            <Link href={`/pages/pokemon/${pokemon.id}`}>
              <div className="text-center p-4">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="mx-auto"
                />
                <p className="mt-2 text-lg font-bold">{pokemon.korean_name}</p>
                <p className="text-sm text-gray-800">도감번호 : {pokemon.id}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
