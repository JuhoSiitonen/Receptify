
const RatingAverage = ({ ratingAverage }) => {

    if (!ratingAverage) {
        return <>No rating</>
    }
    return (
        <div>
            <h2>Rating</h2>
            <p>{Math.round(ratingAverage.averageRating*100)/100}</p>
        </div>
    )
}

export default RatingAverage