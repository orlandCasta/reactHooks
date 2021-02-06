import React,{ useState, useEffect, useReducer, useMemo } from 'react';
import './styles/Character.css';

/* Super complicado pero lo vas a usar muchisimas veces
1. agrega el useReducer
2. crea un estado inicial: la lista de favoritos vacia
3. crea el reducer, es una funcion que usa switch identificar el metodo a usar
	  recive state y action:
		state: el estado actual.
		action: objeto con el metodo que quieres ejecutar junto con el contenido.
		action.type: el metodo a ejecutar.
		action.payload: el contenido nuevo que quieres manejar.
		Ej: ADD_TO_FAVORITE toma el estado actual y le agrega el contenido de payload
4. crea el use reducer:
		favorite: es el nombre el valor de lectura.
		dispatch: el nombre de la funcion para llamar a los metodos.
		useReducer toma dos datos, el primero es el reducer, contenedor del switch de metodos
		el segundo parametro es el estado inicial, que por lo regular es vacio
5. Metodo que llama al dispatch / la funcion para acceder a un metodo del reducer
		contiene el type que es el nombre del metodo
		y el payload que es el contenido que se manejara al correr el metodo
		el contenido del payload en este caso se obtiene del tag que lo llamo con el onclick
6. Onclick que manda a llamar al dispatch
		es un onclick que al ejecutarse manda la data del caracter
		en la funcion esta info sera mandada al reducer y de ahi al state final en favorite
7. map al contenido de favorite, listado del contenido de este array, 
		si no hay pues no se ve nada
*/

const initialState = {
    favorites: []
  }
  
  const favoriteReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITE':
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        };
      default:
        return state;
    }
  }

const Character = () => {

    /* [[useState]] Constante que destructura dos elementos 1.- El estado, 2.- Funcion que va cambiar este estado
    de quien lo destructura de useState, le pasamos el estado inicial (false), esto puede ser un arreglo, string, objeto, etc...*/
    const [characters, setCharacters] = useState([]);

    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

    const [search, setSearch] = useState('');

    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
    }



    const handleSearch = (event) => {
        setSearch(event.target.value)
      }
    
      // const filteredUsers = characters.filter((user) => {
      //   return user.name.toLowerCase().includes(search.toLowerCase());
      // })
    
      const filteredUsers = useMemo(() =>
        characters.filter((user) => {
          return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters, search]
      )



    const getCharacters = async () => {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        setCharacters(data.results)
    }
    
    /* [[useEffect]] Le pasamos dos parametros, el 1.- es una funcion anonima donde esta la logica y el 2.- es una variable que escucha en caso de que tenga un cambio */
    useEffect(() => {
        getCharacters();
    },[]); // Cuando no tenemos alguna variable para escuchar tenemos que pasar un arreglo vacio y ara render una sola vez

    return (
        <div className="Characters">

            {favorites.favorites.map(favorite => (
                <li key={ favorite.id }>
                    {favorite.name}
                </li>
            ))}


            <div className="Search">
                <input type="text" value={search} onChange={handleSearch} />
            </div>

            <ul>
                {filteredUsers.map(character => (
                <li key={character.id}>
                    <div class="center">
                        <div class="property-card">
                            <img src={character.image}></img>
                            <div class="property-image">
                                <div class="property-image-title">
                                </div>
                            </div>
                            <div class="property-description">
                                <h5>{character.name}</h5>
                                <button type="button" onClick={() => handleClick(character)}>Agregar a favoritos</button>
                            </div>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Character;
