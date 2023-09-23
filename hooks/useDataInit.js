import React, {useEffect} from "react";
import useGameStore from "../store/useGameStore";

const useDataInit = () => {
    const { categories, setCategories, questions, addQuestions  } = useGameStore(state => state);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        data
    }, []);
};

export default useDataInit;