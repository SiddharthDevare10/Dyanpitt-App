import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import apiService from '../services/apiService';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        token: action.token,
        user: action.user,
        isAuthenticated: !!action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Restore token on app start
    const restoreToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        const userData = await SecureStore.getItemAsync('userData');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          // Set token in API service
          apiService.setAuthToken(token);
          dispatch({ type: 'RESTORE_TOKEN', token, user });
        } else {
          dispatch({ type: 'RESTORE_TOKEN', token: null, user: null });
        }
      } catch (error) {
        console.error('Error restoring token:', error);
        dispatch({ type: 'RESTORE_TOKEN', token: null, user: null });
      }
    };

    restoreToken();
  }, []);

  const signIn = async (token, user) => {
    try {
      await SecureStore.setItemAsync('authToken', token);
      await SecureStore.setItemAsync('userData', JSON.stringify(user));
      apiService.setAuthToken(token);
      dispatch({ type: 'SIGN_IN', token, user });
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
      apiService.setAuthToken(null);
      dispatch({ type: 'SIGN_OUT' });
    } catch (error) {
      console.error('Error clearing auth data:', error);
      // Still sign out even if there's an error
      dispatch({ type: 'SIGN_OUT' });
    }
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', user: userData });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', isLoading });
  };

  const value = {
    ...state,
    signIn,
    signOut,
    updateUser,
    setLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}