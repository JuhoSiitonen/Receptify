import { useSelector } from 'react-redux';
import Recipies from './Recipies';


const RecipiesView = () => {
    const recipies = useSelector(state => state.recipies)



    return (
        <div>
             <Recipies recipies={recipies} />
        </div>
    )
}

export default RecipiesView