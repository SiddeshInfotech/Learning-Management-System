import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useReducer, useEffect } from 'react';
const AuthContext = createContext(undefined);
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return {
                isAuthenticated: false,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    useEffect(() => {
        // Check for existing token on app start
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        if (token && user) {
            try {
                const parsedUser = JSON.parse(user);
                dispatch({ type: 'LOGIN', payload: { token, user: parsedUser } });
            }
            catch {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
            }
        }
    }, []);
    const login = (token, user) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN', payload: { token, user } });
    };
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };
    return (_jsx(AuthContext.Provider, { value: { ...state, login, logout }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
