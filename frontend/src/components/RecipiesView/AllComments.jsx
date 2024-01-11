import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const AllComments = ({ comments }) => {


    if (!comments) {
        return <>No comments</>
    }
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