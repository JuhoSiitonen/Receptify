
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
          className="show-subscribed-button"
          onClick={handleShowSubscribed}
        >
          {subscribed ? "Show All" : "Show subscribed users"}
        </button>
      );
    }
    
    export default ShowSubscribedButton;
