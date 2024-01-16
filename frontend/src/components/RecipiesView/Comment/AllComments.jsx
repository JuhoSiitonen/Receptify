
const AllComments = ({ comments }) => {
    console.log(comments)

    if (!comments) {
        return <>No comments</>
    }
    return (
        <div>
            <h2>Comments</h2>
            {comments.map(comment => (
                <p key={comment.id}>{comment.comment} - {comment.user.username}  {comment.date}</p>
            ))}
        </div>
    )
}

export default AllComments