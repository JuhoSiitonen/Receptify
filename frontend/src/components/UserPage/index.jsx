import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import recipyService from '../../services/recipies'
import LoadingSpinner from '../LoadingSpinner'
import EditUserinfo from './EditUserinfo'
import './UserPage.css'

const UserPage = () => {
    const [recipies, setRecipies] = useState([])
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
            <h1>UserPage</h1>
                <div>
                    <h2>About me:</h2>
                    <p>{user.about}</p>
                    <p>{user.subscribers} subscribers</p>
                    <p>{user.numberOfRecipes} recipies posted 😊</p>
                    <EditUserinfo user={user} />
                </div>
            <h2>Your recipies:</h2>
            <ul>
                {recipies.map(recipy => 
                <li key={recipy.id}>
                    <Link to={`/recipes/${recipy.id}`}>{recipy.title}</Link>  
                </li>)}
            </ul>
            <h2>Users subscribed to:</h2>
            <ul>
                {user.subscriptions.map(subscription =>
                <li key={subscription.id}>
                    <Link to={`/users/${subscription.id}/view`}>{subscription.username}</Link>
                </li>
                )}
            </ul>
            <h2>Favorited recipies</h2>
            <ul>
                {user.userFavorites.map(favorite =>
                <li key={favorite.id}>
                    <Link to={`/recipes/${favorite.id}`}>{favorite.title}</Link>
                </li>
                )}
            </ul>
        </div>
    )}

export default UserPage