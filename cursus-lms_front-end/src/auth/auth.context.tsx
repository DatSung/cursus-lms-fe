import { ReactNode, createContext, useCallback, useEffect, useReducer } from "react";
import { IAuthContext, IAuthContextAction, IAuthContextActionTypes, IAuthContextState, IJwtTokenDTO, ISignInByGooleInstructorDTO, ISignInByGooleStudentDTO, ISignInDTO, ISignInResponseDTO, ISignUpInstructorDTO, ISignUpResponseDTO, ISignUpStudentDTO } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { getJwtTokenSession, setJwtTokenSession } from "./auth.utils";
import axiosInstance from "../utils/axiosInstance";
import { INSTRUCTOR_SIGNIN_BY_GOOGLE_URL, REFRESH_URL, SIGN_IN_URL, SIGN_UP_INSTRUCTOR_URL, SIGN_UP_STUDENT_URL, STUDENT_SIGNIN_BY_GOOGLE_URL } from "../utils/globalConfig";
import toast from "react-hot-toast";

// Reducer function for useReducer hook
const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {

    if (action.type === IAuthContextActionTypes.SIGNIN) {
        return {
            ...state,
            isAuthenticated: true,
            isFullInfo: true,
            isAuthLoading: false,
            user: action.payload
        }
    }

    if (action.type === IAuthContextActionTypes.SIGNINBYGOOGLE) {
        return {
            ...state,
            isAuthenticated: true,
            isFullInfo: false,
            isAuthLoading: false,
            user: action.payload
        }
    }

    if (action.type === IAuthContextActionTypes.SIGNOUT) {
        return {
            ...state,
            isAuthenticated: true,
            isFullInfo: false,
            isAuthLoading: false,
            user: undefined
        }
    }

    return state;
}

// Initial state object for useReducer hook
const initalAuthState: IAuthContextState = {
    isAuthenticated: false,
    isFullInfo: false,
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

    // Initialize method
    const initializeAuthContext = useCallback(async () => {
        try {

            const { refreshToken } = getJwtTokenSession();

            if (refreshToken) {
                const response = await axiosInstance.post<IJwtTokenDTO>(REFRESH_URL, refreshToken);
                const jwtToken: IJwtTokenDTO = response.data;

                if (jwtToken.isSuccess === false) {
                    throw new Error(jwtToken.message);
                }

                const newAccessToken = jwtToken.result.accessToken;
                const newRefreshToken = jwtToken.result.refreshToken;

                setJwtTokenSession(newAccessToken, newRefreshToken);

                dispatch({
                    type: IAuthContextActionTypes.SIGNIN,
                });
            }

        } catch (error) {
            setJwtTokenSession(null, null);

            dispatch({
                type: IAuthContextActionTypes.SIGNOUT,
            })
        }
    }, []);

    useEffect(() => {
        console.log('AuthContext Initialization start');
        initializeAuthContext()
            .then(() => console.log('AuthContext Initialization was successfully'))
            .catch((error: Error) => console.log(error));
    }, []);

    // Sign In By Email and Password Method
    const signInByEmailPassword = useCallback(async (signInDTO: ISignInDTO) => {
        try {
            const response = await axiosInstance.post<ISignInResponseDTO>(SIGN_IN_URL, signInDTO)
            const signInResponse = response.data;

            if (signInResponse.isSuccess === true) {
                toast.success('Sign in was successfully');

                const { accessToken, refreshToken, userInfo } = signInResponse.result;

                setJwtTokenSession(accessToken, refreshToken);

                dispatch({
                    type: IAuthContextActionTypes.SIGNIN,
                    payload: userInfo
                })

                //// Navigate here
                navigate('/');

            } else {
                toast.success('Something went wrong');
            }

            // navigate(PATH_AFTER_SIGNIN);

        } catch (error) {
            console.log(error)
        }

    }, [])

    /// Sign in by Google for student
    const signInByGoogleStudent = useCallback(async (signInByGoogleStudentDTO: ISignInByGooleStudentDTO) => {
        try {
            const response = await axiosInstance.post<ISignInResponseDTO>(STUDENT_SIGNIN_BY_GOOGLE_URL, signInByGoogleStudentDTO);
            const signInResponse = response.data;

            if (signInResponse.isSuccess === true) {

                toast.success('Sign in was successfully')

                const userInfo = signInResponse.result.userInfo;
                const { accessToken, refreshToken } = signInResponse.result;

                setJwtTokenSession(accessToken, refreshToken);

                if (userInfo.updateTime == undefined) {
                    dispatch({
                        type: IAuthContextActionTypes.SIGNINBYGOOGLE,
                        payload: userInfo
                    });

                    // navigate(PATH_AFTER_SIGNIN_GOOGLE_STUDENT);

                } else {
                    dispatch({
                        type: IAuthContextActionTypes.SIGNIN,
                        payload: userInfo
                    });

                    // navigate(PATH_AFTER_SIGNIN);

                }
            } else {
                toast.success('Something went wrong');
            }

        } catch (error) {
            console.log(error)
        }

    }, [])

    /// Sign in by Google for instructor
    const signInByGoogleInstructor = useCallback(async (signInByGoogleInstructorDTO: ISignInByGooleInstructorDTO) => {
        try {
            const response = await axiosInstance.post<ISignInResponseDTO>(INSTRUCTOR_SIGNIN_BY_GOOGLE_URL, signInByGoogleInstructorDTO);
            const signInResponse = response.data;

            if (signInResponse.isSuccess === true) {

                toast.success('Sign in was successfully')

                const userInfo = signInResponse.result.userInfo;
                const { accessToken, refreshToken } = signInResponse.result;

                setJwtTokenSession(accessToken, refreshToken);

                if (userInfo.updateTime == undefined) {
                    dispatch({
                        type: IAuthContextActionTypes.SIGNINBYGOOGLE,
                        payload: userInfo
                    })

                    // navigate(PATH_AFTER_SIGNIN_GOOGLE_STUDENT);

                } else {
                    dispatch({
                        type: IAuthContextActionTypes.SIGNIN,
                        payload: userInfo
                    })

                    // navigate(PATH_AFTER_SIGNIN);

                }
            } else {
                toast.success('Something went wrong');
            }

        } catch (error) {
            console.log(error)
        }

    }, [])

    // Sign up for student 
    const signUpStudent = useCallback(async (signUpStudentDTO: ISignUpStudentDTO) => {
        try {
            const response = await axiosInstance.post<ISignUpResponseDTO>(SIGN_UP_STUDENT_URL, signUpStudentDTO);
            const signUpReponse = response.data;

            if (signUpReponse.isSuccess === true) {
                toast.success(signUpReponse.message);
            } else {
                console.log(signUpReponse.message);
            }

            // navigate(PATH_AFTER_SIGNUP);

        } catch (error) {
            console.log(error)
        }
    }, [])

    // Sign up for instructor
    const signUpInstructor = useCallback(async (signUpInstructorDTO: ISignUpInstructorDTO) => {
        try {
            const response = await axiosInstance.post<ISignUpResponseDTO>(SIGN_UP_INSTRUCTOR_URL, signUpInstructorDTO);
            const signUpReponse = response.data;

            if (signUpReponse.isSuccess === true) {
                toast.success('Register was successfully. Please signin!');
            } else {
                console.log(signUpReponse.message);
            }

            // navigate(PATH_AFTER_SIGNUP);

        } catch (error) {
            console.log(error)
        }
    }, [])

    const signout = useCallback(() => {
        setJwtTokenSession(null, null);
        dispatch({
            type: IAuthContextActionTypes.SIGNOUT
        });
        navigate('/signin');
    }, [])

    const valuesObject = {

        isAuthenticated: state.isAuthenticated,
        isAuthLoading: state.isAuthLoading,
        isFullInfo: state.isFullInfo,
        user: state.user,

        signInByEmailPassword: signInByEmailPassword,
        signInByGoogleStudent: signInByGoogleStudent,
        signInByGoogleInstructor: signInByGoogleInstructor,
        signUpInstructor: signUpInstructor,
        signUpStudent: signUpStudent,
        signout: signout,

    };

    return (<AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>)
};

export default AuthContextProvider; 