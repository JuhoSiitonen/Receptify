
const UserInfo = ({ userInfo }) => {

    if (!userInfo) {
        return (
            <div>
                <p>Loading user info...</p>
            </div>
        )
    }

    return (
        <div>
            <h2><b>{userInfo.username}</b></h2>
            <p>{userInfo.about}</p>
            <p>{userInfo.subscribers} subscribers</p>
            <p>{userInfo.numberOfRecipes} recipies posted 😊</p>
        </div>
    )
}

export default UserInfo