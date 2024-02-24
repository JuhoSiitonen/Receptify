import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Recipies from './Recipies';
import Filter from '../Filter';
import Togglable from '../Togglable';
import { filterBy } from '../../util/filterFunction';
import { getAllRecipies } from '../../reducers/recipyReducer';
import LoadingSpinner from '../LoadingSpinner';

const RecipiesView = () => {
    const dispatch = useDispatch()
    const recipies = useSelector(state => state.recipies)
    const [filteredRecipies, setFilteredRecipies] = useState(recipies);
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(getAllRecipies(query));
      }, [query]);
    
    /*
    useEffect(() => {
        setFilteredRecipies(recipies);
    }, [recipies]);
    */
    if (!recipies) {
        return <LoadingSpinner />
    }

    const handleFilter = ({ option, value }) => {
        let queryParams = `{${option}:${value}}`
        setQuery(queryParams)
        /*
        const filtered = recipies.filter((recipe) =>
            filterBy({ option, value, recipe })
        );
        setFilteredRecipies(filtered);
        */
    };

    const handleCancel = () => {
        setFilteredRecipies(recipies);
    }

    return (
        <div>
            <Togglable buttonLabel="Filter" onCancel={handleCancel}>
                <Filter onFilter={handleFilter} />
            </Togglable>
            <br></br>
            <Recipies recipies={recipies} />
        </div>
    )
}

export default RecipiesView