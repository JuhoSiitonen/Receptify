import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllRecipies } from '../../reducers/recipyReducer';
import Recipies from './Recipies';
import Filter from '../Filter';
import Togglable from '../Togglable';
import LoadingSpinner from '../LoadingSpinner';
import SortBy from '../SortBy';

const RecipiesView = () => {
    const dispatch = useDispatch()
    const recipies = useSelector(state => state.recipies)
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(getAllRecipies(query));
      }, [query]);
    
    if (!recipies) {
        return <LoadingSpinner />
    }

    const handleFilter = ({ option, value }) => {
        if (query === '') {
            let queryParams = `${option}=${value}`
            setQuery(queryParams)
        } else {
            let queryParams = `&${option}=${value}`
            let newQuery = query + queryParams
            setQuery(newQuery)
        }
        
    };

    const handleSort = ({ option, value }) => {
        if (query === '') {
            let queryParams = `sort=${option}&order=${value}`
            setQuery(queryParams)
        } else {
            let queryParams = `&sort=${option}&order=${value}`
            let newQuery = query + queryParams
            setQuery(newQuery)
        }
    }

    const handleCancel = () => {
        setQuery('')
    }

    return (
        <div>
            <Togglable buttonLabel="Filter" onCancel={handleCancel}>
                <Filter onFilter={handleFilter} />
            </Togglable>
            <Togglable buttonLabel="Sort">
                <SortBy onSort={handleSort} />
            </Togglable>
            <br></br>
            <Recipies recipies={recipies} />
        </div>
    )
}

export default RecipiesView