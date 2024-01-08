import { useSelector } from "react-redux";


const Notifications = () => {
    const notification = useSelector(state => state.notification)
    return (
       <div>
        {notification}
       </div>
    );
}

export default Notifications