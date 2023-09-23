import {queries} from "../services/queries";
import React, {useCallback} from "react";
import CustomButton from "./CustomButton";

const UpdateDataButton = () => {
    const {isFetching, refetch} = queries.useGetCategories();

    const onPress = useCallback(() => {
        refetch();
    }, []);

    return <CustomButton onPress={onPress} title="Update" color="#333" loading={isFetching}/>;
}

export default UpdateDataButton;