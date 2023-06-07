import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image'
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if ( isNaN(id) ) redirect(301, '/');
  if ( id <= 0 ) redirect(301, '/');
  if ( id > 1000 ) redirect(301, '/');

  return id;
})
export default component$(() => {

  // const location = useLocation();

  const pokemonId = usePokemonId();
  const { isPokemonVisible, showBackImage  } = useContext( PokemonGameContext )

  return <>
      {/* <span class="text-2xl">Pokemon: { location.params.id }</span> */}
      <span class="text-2xl">Pokemon: { pokemonId }</span>

      <PokemonImage 
        id={ pokemonId.value }
        backImage={ showBackImage }
        isVisible={ isPokemonVisible }
      />
    </>
});