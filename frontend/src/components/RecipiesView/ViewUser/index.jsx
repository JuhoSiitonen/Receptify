import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { userRecipies } from "../../../reducers/recipyReducer";
import { useEffect } from "react";
import UserInfo from "./UserInfo";
import Recipies from "../Recipies";
import LoadingSpinner from "../../LoadingSpinner";

const ViewUser = () => {
    const dispatch = useDispatch()
    const match = useMatch('/users/:id/view');
    const userId = Number(match?.params.id);
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(userRecipies(userId))
    }, [])
    
    const recipies = useSelector(state => state.recipies)

    if (!recipies || !user) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <UserInfo />
            <Recipies recipies={recipies}/>
        </div>
    )
}

export default ViewUser