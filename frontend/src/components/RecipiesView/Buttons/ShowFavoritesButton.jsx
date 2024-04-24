
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
      onClick={handleShowFavorites}
    >
      {favorites ? "Show All" : "Favorites"}
    </button>
  );
}

export default ShowFavoritesButton;