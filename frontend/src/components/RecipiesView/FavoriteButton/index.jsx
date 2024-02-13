import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addFavorite } from '../../../reducers/userReducer'

const FavoriteButton = ({ recipyId }) => {
    const [buttonText, setButtonText] = useState('Favorite')
    const [isFavorite, setIsFavorite] = useState(false)
    const dispatch = useDispatch()

    const handleClick = async () => {
        console.log('Favorite button clicked')
        await dispatch(addFavorite(recipyId))
        setButtonText('Favorited')
        setIsFavorite(true)
    }

    return (
        <div>
            {!isFavorite && <button onClick={handleClick}>{buttonText}</button>}
            {isFavorite && <button disabled>{buttonText}</button>}
        </div>
    )

}

export default FavoriteButton