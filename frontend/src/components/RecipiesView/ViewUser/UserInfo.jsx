

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
            <h2>{userInfo.username}</h2>
            <p>Test user and his/her recipies:</p>
        </div>
    )
}

export default UserInfo