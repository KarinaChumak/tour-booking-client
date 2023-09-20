import { createContext } from 'react';

const AuthContext = createContext();
const initialState = { user: null, isAuthenticated: false };
