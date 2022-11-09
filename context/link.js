const { createContext, useState, useEffect } = require('react');
import AsyncStorage from '@react-native-async-storage/async-storage';

const LinkContext = createContext();

const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([]);

  return (
    <LinkContext.Provider value={{ links, setLinks }}>
      {children}
    </LinkContext.Provider>
  );
};

export { LinkContext, LinkProvider };
