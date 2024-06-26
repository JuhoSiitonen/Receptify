import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { userRecipies } from "../../../reducers/recipyReducer";
import { useEffect, useState } from "react";
import userService from "../../../services/users";
import UserInfo from "./UserInfo";
import Recipies from "../Recipies";
import LoadingSpinner from "../../LoadingSpinner";
import AddSubscriptionButton from "./AddSubscriptionButton";
import Togglable from "../../Togglable";
import InfiniteScroll from "react-infinite-scroll-component";
import '../../../styles/ViewUser.css'

const ViewUser = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [hasMore, setHasMore] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const match = useMatch('/users/:id/view');
    const userId = Number(match?.params.id);
    const user = useSelector(state => state.user)

    useEffect(() => {
        const fetchUserInfo = async () => {
            await dispatch(userRecipies(userId))
            const userInfo = await userService.getUserInfo(userId)
            setUserInfo(userInfo)
        }
        fetchUserInfo()
    }, [])

    const fetchMoreData = async () => {
        await dispatch(userRecipies(userId, recipies.length))
        if (recipies.length % 5 === 0) {
            setHasMore(true)
        } else {
            setHasMore(false)
        }
    }
    
    const recipies = useSelector(state => state.recipies)

    if (!recipies || !user || !userInfo) {
        return <LoadingSpinner />;
    }

    const userSubscribe = () => {
        return (
            <div className="action-button">
                <AddSubscriptionButton friendId={userId} user={user} />
            </div>
        )
    }

    const handleUserDeletion = async () => {
        if (window.confirm(`Are you sure you want to delete user ${userInfo.username}?`)) {
            await userService.deleteUser(userId)
            navigate('/')
        }
    }

    return (
        <div>
            <div className="view-user">
                <UserInfo userInfo={userInfo}/>
                {user.id !== userId && (userSubscribe())}
                {user.admin && (
                    <div className="action-button">
                        <button onClick={handleUserDeletion}>Delete user</button>
                    </div>
                )}
            </div>
            <div className="action-button">
                <Togglable buttonLabel="Show recipies" cancelLabel="Hide recipies" topCancel={true} center={true}>
                    <InfiniteScroll
                      dataLength={recipies.length}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      loader={<LoadingSpinner />}
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                        <Recipies recipies={recipies} inViewUser={true}/>
                    </InfiniteScroll>
                </Togglable>
            </div>
        </div>
    )
}

export default ViewUser