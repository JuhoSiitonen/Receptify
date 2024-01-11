import { useSelector } from 'react-redux'

const AllComments = ({ comments }) => {
    console.log(comments)

    if (!comments) {
        return <>No comments</>
    }
    return (
        <div>
            <h2>Comments</h2>
            {comments.map(comment => (
                <p key={comment.id}>{comment.comment}</p>
            ))}
        </div>
    )
}

export default AllComments