import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import recipyService from '../../services/recipies'
import LoadingSpinner from '../LoadingSpinner'
import EditUserinfo from './EditUserinfo'
import '../../styles/UserPage.css'

const UserPage = () => {
    const [recipies, setRecipies] = useState([])
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    useEffect(() => {
        const fetchMyRecipies = async () => {
            const result = await recipyService.getUserRecipies()
            setRecipies(result)
        }
        fetchMyRecipies()
    } , [])

    if (user === null) {
        return <LoadingSpinner />;
      }
    
    return (
        <div className="user-page">
            <h1>{user.username}</h1>
                <div>
                    <h2>About me:</h2>
                    {user.about === '' ? <p>No information provided</p> : <p>{user.about}</p>}
                    <p>{user.subscribers} subscribers</p>
                    {user.numberOfRecipes === 0 ? 
                    <p>No recipies posted ☹</p> : 
                    <p>{user.numberOfRecipes} recipies posted 😊</p> }
                    <EditUserinfo user={user} />
                </div>
            {user.numberOfRecipes === 0 ? <></> : (
                <div>
                    <h2>Your recipies:</h2>
                    <ul>
                    {recipies.map(recipy => 
                        <li key={recipy.id} onClick={()=>{navigate(`/recipes/${recipy.id}`)}}>
                            {recipy.title} 
                        </li>
                    )}
                    </ul>  
                </div>
            )}
            {user.subscriptions.length === 0 ? <></> : (
                <div> 
                    <h2>Users subscribed to:</h2>
                    <ul>
                    {user.subscriptions.map(subscription =>
                        <li key={subscription.id} onClick={()=>{navigate(`/users/${subscription.id}/view`)}}>
                        {subscription.username}
                        </li>
                    )}
                    </ul>
                </div>
            )}
            {user.userFavorites.length === 0 ? <></> : (
                <div>
                    <h2>Favorited recipies:</h2>
                    <ul>
                        {user.userFavorites.map(favorite =>
                        <li key={favorite.id} onClick={()=>{navigate(`/recipes/${favorite.id}`)}}>
                            {favorite.title}
                        </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )}

export default UserPage