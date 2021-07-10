import { useEffect, useState } from "react";




const FavouriteButton = ({addToFavourites,inFavourites}) => {

   // let inFavourites = favFilms?.find(el=> el.id === film?.id)
    useEffect (()=> {
        
    },[])


    const favouriteButtonHandler = () => {
        
        addToFavourites();
        
    }

    return(

        <>
        {!inFavourites ?<button className="currentFilm__btn btn" onClick={()=>favouriteButtonHandler()}>Добавить в любимые</button>
        : 
        <button className='currentFilm__btn btn'  onClick={()=>favouriteButtonHandler()}>Удалить из Любимых</button>}
        
        
        </>
    )

}

export default FavouriteButton;