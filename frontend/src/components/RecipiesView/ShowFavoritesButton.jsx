
const ShowFavoritesButton = ({ favorites, setFavorites }) => {
  return (
    <button
      className="show-favorites-button"
      onClick={() => setFavorites(!favorites)}
    >
      {favorites ? "Show All" : "Show Favorites"}
    </button>
  );
}

export default ShowFavoritesButton;