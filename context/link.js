const { createContext, useState, useEffect } = require('react');
import AsyncStorage from '@react-native-async-storage/async-storage';

const LinkContext = createContext();

const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([]);

  // useEffect(() => {
  //   const loadLinksFromAsyncStorage = async () => {
  //     const data = await AsyncStorage.getItem('@links');
  //     const parsedData = JSON.parse(data);
  //     setLinks(parsedData);
  //   };

  //   loadLinksFromAsyncStorage();
  // }, []);

  return (
    <LinkContext.Provider value={{ links, setLinks }}>
      {children}
    </LinkContext.Provider>
  );
};

export { LinkContext, LinkProvider };
