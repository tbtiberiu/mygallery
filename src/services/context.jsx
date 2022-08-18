import React, { createContext, useState } from "react";

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setSearchText(lowerCase);
    }

    const handleSearchClear = () => {
        setSearchText("");
    }

    return (
        <SearchContext.Provider value={{ searchText, handleSearchChange, handleSearchClear }}>
            {children}
        </SearchContext.Provider>
    );
};
