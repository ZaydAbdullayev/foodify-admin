import { useLocation, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const useSearchAppParams = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Memoize params to avoid recalculations
    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

    // Get all params
    const getAllParams = () => {
        return {
            pair: Object.fromEntries(params.entries()),
        };
    };

    // Remove by key
    const removeParamsByKeys = (keys) => {
        const currentParams = getAllParams().pair;

        keys.forEach(key => delete currentParams[key]);

        setSearchParams(currentParams);
    };

    // Setter
    const setParams = (newParams) => {
        const currentParams = getAllParams().pair;
        setSearchParams({ ...currentParams, ...newParams });
    };

    // Clear all params
    const clearParams = () => {
        setSearchParams({});
    };

    // Getter
    const getParams = (key) => searchParams.get(key);

    return {
        getAllParams,
        removeParamsByKeys,
        setParams,
        getParams,
        clearParams,
    };
};

export { useSearchAppParams };
