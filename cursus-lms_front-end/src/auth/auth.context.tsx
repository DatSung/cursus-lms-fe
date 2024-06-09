import { Children, ReactNode, createContext, useReducer } from "react";
import { IAuthContext, IAuthContextAction, IAuthContextActionTypes, IAuthContextState } from "../types/auth.types";
import { useNavigate } from "react-router-dom";

// Reducer function for useReducer hook
const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {

    if (action.type === IAuthContextActionTypes.LOGIN) {
        return {
            ...state,
            isAuthenticated: true,
            isAuthLoading: false,
            user: action.payload
        }
    }

    if (action.type === IAuthContextActionTypes.LOGOUT) {
        return {
            ...state,
            isAuthenticated: true,
            isAuthLoading: false,
            user: undefined
        }
    }

    return state;
}

// Initial state object for useReducer hook
const initalAuthState: IAuthContextState = {
    isAuthenticated: false,
    isAuthLoading: true,
    user: undefined
}

// Create context
export const AuthContext = createContext<IAuthContext | null>(null);

// Interface for context props
interface IProps {
    children: ReactNode;
}

// Create a component to manage all auth functionalities
const AuthContextProvider = ({ children }: IProps) => {

    const [state, dispatch] = useReducer(authReducer, initalAuthState);
    const navigate = useNavigate();
    
}