// GlobalProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signIN, signOut } from "../lib/appwrite"; // Ensure signOut is implemented in appwrite.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      if (session) {
        const user = JSON.parse(session);
        setIsLogged(true);
        setUser(user);
      }
    } catch (error) {
      console.log('Error fetching session:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signIN(email, password);
      setUser(response);
      setIsLogged(true);
      await AsyncStorage.setItem('userSession', JSON.stringify(response));
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLogged(false);
      await AsyncStorage.removeItem('userSession');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
