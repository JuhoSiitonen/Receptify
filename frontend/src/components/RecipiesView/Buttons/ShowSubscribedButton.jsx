
const ShowSubscribedButton = ({ 
  subscribed, setSubscribed, favorites, setFavorites }) => {

    const handleShowSubscribed = () => {
      setSubscribed(!subscribed);
      if (favorites) {
        setFavorites(false);
      }
    }

    return (
        <button
          onClick={handleShowSubscribed}
        >
          {subscribed ? "Show All" : "Subscribed"}
        </button>
      );
    }
    
    export default ShowSubscribedButton;
