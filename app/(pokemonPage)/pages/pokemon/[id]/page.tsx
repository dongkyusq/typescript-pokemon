import Navigation from "./navigation";

export default async function PokemonDetail({
  params,
}: {
  params: { id: string };
}) {
  let pokemon = null;
  let error = null;

  try {
    const response = await fetch(
      `http://localhost:3000/api/pokemons/${params.id}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    pokemon = await response.json();
  } catch (err) {
    error = (err as Error).message;
  }

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
