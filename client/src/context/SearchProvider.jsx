import { createContext, React, useContext, useState } from "react";
// import axios from "axios";
const searchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    result: [],
  });

  //set default header for any axios request

  // axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <searchContext.Provider value={[search, setSearch]}>
      {children}
    </searchContext.Provider>
  );
};

export default SearchProvider;
// custom hook
const useSearch = () => useContext(searchContext);
export { useSearch };
