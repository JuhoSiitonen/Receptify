import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { userRecipies } from "../../../reducers/recipyReducer";
import { useEffect, useState } from "react";
import userService from "../../../services/users";
import UserInfo from "./UserInfo";
import Recipies from "../Recipies";
import LoadingSpinner from "../../LoadingSpinner";
import AddFriendButton from "./AddFriendButton";

const ViewUser = () => {
    const [userInfo, setUserInfo] = useState(null)
    const dispatch = useDispatch()
    const match = useMatch('/users/:id/view');
    const userId = Number(match?.params.id);
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(userRecipies(userId))
        setUserInfo(userService.getUserInfo(userId))
    }, [])
    
    const recipies = useSelector(state => state.recipies)

    if (!recipies || !user) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <UserInfo />
            {user.id === userId && <h2>Your recipies:</h2>}
            {user.id !== userId && (
            <div>
                <AddFriendButton friendId={userId} />
                <h2>Recipies by :</h2>
            </div>
            )}
            <Recipies recipies={recipies}/>
        </div>
    )
}

export default ViewUser