const { createContext, useState, useEffect } = require('react');
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      const data = await AsyncStorage.getItem('@auth');
      const parsedData = JSON.parse(data);
      setAuth({ ...auth, user: parsedData?.user, token: parsedData?.token });
    };

    loadFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
