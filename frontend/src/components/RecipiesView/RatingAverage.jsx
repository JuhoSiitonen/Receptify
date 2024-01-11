import { useSelector } from 'react-redux'

const RatingAverage = () => {
    const ratingAverage = useSelector(state => state.rating)
    console.log(ratingAverage)

    if (!ratingAverage) {
        return <>No rating</>
    }
    return (
        <div>
            <h2>Rating</h2>
            <p>{ratingAverage}</p>
        </div>
    )
}

export default RatingAverage