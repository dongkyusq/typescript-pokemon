export const PokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=151";
export const SpeciesPokemonURL = "https://pokeapi.co/api/v2/pokemon-species";

export type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
  image: string;
};

export default async function getPokemon(): Promise<Pokemon[]> {
  const response = await fetch(PokemonURL);
  const json = await response.json();

  const pokemonDetails = await Promise.all(
    json.results.map(async (pokemon: { name: string; url: string }) => {
      const id = pokemon.url.split("/").filter(Boolean).pop();
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();

      const speciesResponse = await fetch(`${SpeciesPokemonURL}/${id}`);
      const species = await speciesResponse.json();

      const koreanNameEntry = species.names.find(
        (nameEntry: { language: { name: string }; name: string }) =>
          nameEntry.language.name === "ko"
      );
      const koreanName = koreanNameEntry ? koreanNameEntry.name : pokemon.name;

      return {
        name: pokemon.name,
        url: pokemon.url,
        id,
        image: details.sprites.front_default,
        korean_name: koreanName,
      };
    })
  );

  return pokemonDetails;
}
