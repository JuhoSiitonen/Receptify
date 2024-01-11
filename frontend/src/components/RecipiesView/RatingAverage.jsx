import { useDispatch } from 'react-redux'

const RatingAverage = ({ RatingAverage }) => {

    if (!RatingAverage) {
        return <>No rating</>
    }
    return (
        <div>
            <h2>Rating</h2>
            <p>{RatingAverage}</p>
        </div>
    )
}

export default RatingAverage