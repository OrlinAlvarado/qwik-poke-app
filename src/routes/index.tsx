import { $, component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  // const pokemonId = useSignal(1); // Primitivos
  // const showBackImage = useSignal(false); 
  // const isPokemonVisible = useSignal(true); 


  const nav = useNavigate()

  const pokemonGame = useContext( PokemonGameContext );

  const changePokemonId = $((value:number) => {
    if ((pokemonGame.pokemonId + value) <= 0) return;

    pokemonGame.pokemonId += value
  })

  const goToPokemon = $(() => {
    nav(`/pokemon/${ pokemonGame.pokemonId }`)
  })
  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{ pokemonGame.pokemonId }</span>

      {/* <Link href={`/pokemon/${ pokemonId.value }/`}> */}
      <div onClick$={ () => goToPokemon() }>
        <PokemonImage 
          id={ pokemonGame.pokemonId } 
          backImage={ pokemonGame.showBackImage} 
          isVisible={ pokemonGame.isPokemonVisible }
        />
      </div>
      {/* </Link> */}

      <div class="mt-2">
        <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ () => changePokemonId(+1) } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={ () => pokemonGame.showBackImage = !pokemonGame.showBackImage } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ () => pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible } class="btn btn-primary">{ pokemonGame.isPokemonVisible ? 'Ocultar' : 'Revelar'}</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Esta es mi primera aplicación en Qwik',
    },
  ],
};
