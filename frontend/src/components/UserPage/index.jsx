import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import LoadingSpinner from '../LoadingSpinner'

const UserPage = () => {
    const user = useSelector(state => state.user)

    if (user === null) {
        return <LoadingSpinner />;
      }

    const memoizedUser = useMemo(() => user, [user]);
    const recipies = useSelector(state => {
        return state.recipies.filter(recipy => recipy.userId === memoizedUser.id)
    })
    
    return (
        <div>
            <h1>UserPage</h1>
            <h2>Your recipies:</h2>
            <ul>
                {recipies.map(recipy => <li key={recipy.id}>{recipy.title}</li>)}
            </ul>
        </div>
    )}

export default UserPage