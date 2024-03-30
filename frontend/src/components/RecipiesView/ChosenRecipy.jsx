import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import recipyService from "../../services/recipies"
import LoadingSpinner from "../LoadingSpinner"
import SingleRecipy from "./SingleRecipy"
import UpdateRecipy from "./UpdateRecipy"
import './SingleRecipy.css'

const ChosenRecipy = () => {
    const [recipy, setRecipy] = useState(null)
    const match = useMatch('/recipes/:id');
    const recipyId = Number(match?.params.id);
    const user = useSelector(state => state.user)

    useEffect(() => {
        const fetchSingleRecipy = async () => {
            const result = await recipyService.getSingleRecipy(recipyId)
            setRecipy(result)
        }
        fetchSingleRecipy()
    }, [])
 
    if (!user) {
        return <LoadingSpinner />;
    }
    
    if (!recipy) {
        return <>No recipy found</>
    }

    return (
        <div>
            <div className="single-recipe">
              <SingleRecipy recipy={recipy} />
            </div>
            {user && user.id === recipy.owner.id && (
            <div>
              <UpdateRecipy recipy={recipy} />
            </div>
            )}
        </div>
    )
}

export default ChosenRecipy

