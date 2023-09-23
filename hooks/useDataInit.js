import React, {useEffect} from "react";
import useCategoriesStore from "../store/useCategoriesStore";

const useDataInit = () => {
    const { categories, setCategories, questions, addQuestions  } = useCategoriesStore(state => state);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        data
    }, []);
};

export default useDataInit;