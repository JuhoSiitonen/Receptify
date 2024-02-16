import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { addFavorite, deleteFavorite } from '../../../reducers/userReducer'

const FavoriteButton = ({ recipyId, user }) => {
    const [buttonText, setButtonText] = useState('')
    const [isFavorite, setIsFavorite] = useState(user.userFavorites.some(f => f.id === recipyId))
    const dispatch = useDispatch()

    useEffect(() => {
        if (isFavorite) {
            setButtonText('Remove favorite')
        } else {
            setButtonText('Favorite')
        }
    }, [isFavorite])

    const handleClick = async () => {
        console.log('Favorite button clicked')
        await dispatch(addFavorite(recipyId))
        setButtonText('Remove favorite')
        setIsFavorite(true)
    }

    const handleDeleteClick = async () => {
        console.log('Favorite button clicked')
        await dispatch(deleteFavorite(recipyId))
        setButtonText('Favorite')
        setIsFavorite(false)
    }

    return (
        <div>
            {!isFavorite && <button onClick={handleClick}>{buttonText}</button>}
            {isFavorite && <button onClick={handleDeleteClick}>{buttonText}</button>}
        </div>
    )

}

export default FavoriteButton