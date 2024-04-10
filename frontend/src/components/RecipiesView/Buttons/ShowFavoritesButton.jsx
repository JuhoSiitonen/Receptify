
const ShowFavoritesButton = ({ 
  favorites, setFavorites, subscribed, setSubscribed }) => {
  const handleShowFavorites = () => {
    setFavorites(!favorites);
    if (subscribed) {
      setSubscribed(false);
    }
  }
  return (
    <button
      className="show-favorites-button"
      onClick={handleShowFavorites}
    >
      {favorites ? "Show All" : "Show Favorites"}
    </button>
  );
}

export default ShowFavoritesButton;