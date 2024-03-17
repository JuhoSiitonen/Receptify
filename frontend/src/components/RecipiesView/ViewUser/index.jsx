import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { userRecipies } from "../../../reducers/recipyReducer";
import { useEffect, useState } from "react";
import userService from "../../../services/users";
import UserInfo from "./UserInfo";
import Recipies from "../Recipies";
import LoadingSpinner from "../../LoadingSpinner";
import AddSubscriptionButton from "./AddSubscriptionButton";
import Togglable from "../../Togglable";
import './ViewUser.css'

const ViewUser = () => {
    const [userInfo, setUserInfo] = useState(null)
    const dispatch = useDispatch()
    const match = useMatch('/users/:id/view');
    const userId = Number(match?.params.id);
    const user = useSelector(state => state.user)

    const userInfoGetter = async (userId) => {
        const userInfo = await userService.getUserInfo(userId)
        setUserInfo(userInfo)
    }

    useEffect(() => {
        dispatch(userRecipies(userId))
        userInfoGetter(userId)
    }, [])
    
    const recipies = useSelector(state => state.recipies)

    if (!recipies || !user || !userInfo) {
        return <LoadingSpinner />;
    }

    const userSubscribe = () => {
        return (
            <div>
                <AddSubscriptionButton friendId={userId} user={user} />
                <h2>Recipies by {userInfo.username}:</h2>
            </div>
        )
    }

    return (
        <div className="view-user">
            <UserInfo userInfo={userInfo}/>
            {user.id === userId && <h2>Your recipies:</h2>}
            {user.id !== userId && (userSubscribe())}
            <Togglable buttonLabel="Show recipies" cancelLabel="Hide recipies" topCancel={true}>
                <Recipies recipies={recipies} inViewUser={true}/>
            </Togglable>
        </div>
    )
}

export default ViewUser