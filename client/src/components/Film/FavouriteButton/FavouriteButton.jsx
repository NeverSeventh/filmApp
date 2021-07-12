




const FavouriteButton = ({addToFavourites,inFavourites}) => {




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