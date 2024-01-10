import { useSelector } from 'react-redux'

const AllComments = ({ recipyId }) => {
    const comments = useSelector(state => state.recipies)
        .find(recipy => recipy.id === recipyId)
        .comments

    return (
        <div>
            <h2>Comments</h2>
            {comments.map(comment => (
                <p key={comment.id}>{comment.content}</p>
            ))}
        </div>
    )
}

export default AllComments