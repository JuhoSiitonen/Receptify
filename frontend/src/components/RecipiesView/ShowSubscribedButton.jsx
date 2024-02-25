
const ShowSubscribedButton = ({ subscribed, setSubscribed }) => {
    return (
        <button
          className="show-subscribed-button"
          onClick={() => setSubscribed(!subscribed)}
        >
          {subscribed ? "Show All" : "Show subscribed users"}
        </button>
      );
    }
    
    export default ShowSubscribedButton;
