
const RatingAverage = ({ averageRating }) => {

    if (!averageRating) {
        return <>No rating</>
    }
    return (
        <div>
            <h2>Rating</h2>
            <p>{Math.round(averageRating*100)/100}</p>
        </div>
    )
}

export default RatingAverage