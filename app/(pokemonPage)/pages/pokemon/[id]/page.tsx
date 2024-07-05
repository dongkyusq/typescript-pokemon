// `app/(pokemonPage)/pages/pokemon/[id]/page.tsx`

"use client";

import { useEffect, useState } from "react";
import Navigation from "./navigation";

export default function PokemonDetail({ params }: { params: { id: string } }) {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch(`/api/pokemons/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!pokemon) return <p>포켓몬 데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1>
          <Navigation />
        </h1>
        <h1> {pokemon.korean_name}</h1>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.korean_name}
          className="w-48 h-48 mx-auto"
        />

        <p className="text-red-600">키: {pokemon.height}0cm</p>
        <p className="text-red-600">몸무게: {pokemon.weight / 10} kg</p>
        <div>
          <h4 className="text-blue-600">타입</h4>
          <ul>
            {pokemon.types.map((type: any) => (
              <li key={type.type.name}>{type.type.korean_name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-blue-600">특성</h4>
          <ul>
            {pokemon.abilities.map((ability: any) => (
              <li key={ability.ability.name}>{ability.ability.korean_name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-blue-600">사용 가능 스킬</h4>
          <ul>
            {pokemon.moves.map((move: any) => (
              <li key={move.move.name}>{move.move.korean_name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
