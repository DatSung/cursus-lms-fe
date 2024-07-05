import {ReactNode, createContext, useCallback, useEffect, useReducer} from "react";
import {
    IAuthContext,
    IAuthContextAction,
    IAuthContextActionTypes,
    IAuthContextState, ICompleteInstructorProfile, ICompleteStudentProfile, IDegreeUploadDTO,
    IJwtTokenDTO,
    IResponseDTO, ISignInByGoogleDTO,
    ISignInDTO,
    ISignInResponseDTO,
    ISignUpInstructorDTO,
    ISignUpResponseDTO,
    ISignUpStudentDTO, IUserInfo, RolesEnum
} from "../types/auth.types";
import {useNavigate} from "react-router-dom";
import {getJwtTokenSession, setJwtTokenSession} from "./auth.utils";
import axiosInstance from "../utils/axios/axiosInstance.ts";
import {
    COMPLETE_INSTRUCTOR_PROFILE_URL,
    COMPLETE_STUDENT_PROFILE_URL, GET_USER_INFO_URL,
    REFRESH_URL,
    SEND_VERIFY_EMAIL_URL, SIGN_IN_BY_GOOGLE_URL,
    SIGN_IN_URL,
    SIGN_UP_INSTRUCTOR_URL,
    SIGN_UP_STUDENT_URL,
    UPLOAD_INSTRUCTOR_DEGREE_URL
} from "../utils/apiUrl/authApiUrl.ts";
import toast from "react-hot-toast";
import {PATH_ADMIN, PATH_PUBLIC} from "../routes/paths.ts";
import {jwtDecode} from "jwt-decode";
import SignalRService from "../utils/signalR/signalRService.ts";

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
            isAuthenticated: false,
            isFullInfo: false,
            isAuthLoading: false,
            user: undefined
        }
    }

    if (action.type === IAuthContextActionTypes.COMPLETE_PROFILE) {
        return {
            ...state,
            isAuthenticated: true,
            isFullInfo: true,
            isAuthLoading: false,
        }
    }

    return state;
}

// Initial state object for useReducer hook
const initialAuthState: IAuthContextState = {
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
const AuthContextProvider = ({children}: IProps) => {

    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    const navigate = useNavigate();

    const isTokenValid = (token: string | null) => {
        if (!token) return false;

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // current time in seconds

        if (decodedToken.exp == null) {
            return false
        }

        return decodedToken.exp > currentTime;
    };

    // Initialize method
    const initializeAuthContext = useCallback(async () => {
        try {

            const {refreshToken, accessToken} = getJwtTokenSession();

            if (refreshToken && !isTokenValid(accessToken)) {
                const token = {
                    accessToken,
                    refreshToken,
                }
                const response = await axiosInstance.post<IJwtTokenDTO>(REFRESH_URL, token);
                const jwtToken: IJwtTokenDTO = response.data;

                if (!jwtToken.isSuccess) {
                    throw new Error(jwtToken.message);
                }

                const newAccessToken = jwtToken.result.accessToken;
                const newRefreshToken = jwtToken.result.refreshToken;

                setJwtTokenSession(newAccessToken, newRefreshToken);

                // Connect to signalR hub from back-end
                await SignalRService.startConnection();

                const userInfoResponse = await axiosInstance.get<IResponseDTO<IUserInfo>>(GET_USER_INFO_URL);
                const userInfo = userInfoResponse.data.result;

                dispatch({
                    type: IAuthContextActionTypes.SIGNIN,
                    payload: userInfo
                });
            } else {
                const {accessToken} = getJwtTokenSession();
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                const userInfoResponse = await axiosInstance.get<IResponseDTO<IUserInfo>>(GET_USER_INFO_URL);
                const userInfo = userInfoResponse.data.result;

                // Connect to signalR hub from back-end
                await SignalRService.startConnection();

                dispatch({
                    type: IAuthContextActionTypes.SIGNIN,
                    payload: userInfo
                });
            }

        } catch (error) {
            setJwtTokenSession(null, null);

            dispatch({
                type: IAuthContextActionTypes.SIGNOUT,
            })
        }
    }, []);


    // Initialize when first load
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

            if (signInResponse.isSuccess) {
                toast.success('Sign in was successfully');

                const {accessToken, refreshToken} = signInResponse.result;

                setJwtTokenSession(accessToken, refreshToken);

                const userInfoResponse = await axiosInstance.get<IResponseDTO<IUserInfo>>(GET_USER_INFO_URL);
                const userInfo = userInfoResponse.data.result;

                // Connect to signalR hub from back-end
                await SignalRService.startConnection();

                dispatch({
                    type: IAuthContextActionTypes.SIGNIN,
                    payload: userInfo
                })

                if (userInfo.roles[0] === RolesEnum.INSTRUCTOR) {
                    if (!userInfo.isUploadDegree) {
                        navigate(PATH_PUBLIC.uploadDegree);
                    }
                } else if (userInfo.roles[0] === RolesEnum.STUDENT) {
                    navigate(PATH_PUBLIC.home);
                } else {
                    navigate(PATH_ADMIN.dashboard);
                }

            } else {
                toast.error(signInResponse.message);
                if (signInResponse.statusCode === 401) {
                    const emailToSend = {
                        email: signInDTO.email
                    }
                    const response = await axiosInstance.post<IResponseDTO<string>>(SEND_VERIFY_EMAIL_URL, emailToSend);
                    const sendResponse = response.data;
                    if (sendResponse.isSuccess) {
                        toast.success(sendResponse.message);
                    }
                }
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        }

    }, [])

    // Sign In By Google Method
    const signInByGoogle = useCallback(async (signInByGoogleDTO: ISignInByGoogleDTO) => {
        try {
            const response = await axiosInstance.post<ISignInResponseDTO>(SIGN_IN_BY_GOOGLE_URL, signInByGoogleDTO);
            const signInResponse = response.data;

            if (signInResponse.isSuccess === true) {

                toast.success('Sign in was successfully')

                const {accessToken, refreshToken} = signInResponse.result;

                setJwtTokenSession(accessToken, refreshToken);

                // Connect to signalR hub from back-end
                await SignalRService.startConnection();

                const userInfoResponse = await axiosInstance.get<IResponseDTO<IUserInfo>>(GET_USER_INFO_URL);
                const userInfo = userInfoResponse.data.result;

                if (userInfo.roles.length == 0) {
                    dispatch({
                        type: IAuthContextActionTypes.SIGNINBYGOOGLE,
                        payload: userInfo
                    });

                    navigate(PATH_PUBLIC.completeProfile);

                } else {
                    if (userInfo.roles[0] === RolesEnum.INSTRUCTOR) {
                        if (!userInfo.isUploadDegree) {
                            dispatch({
                                type: IAuthContextActionTypes.COMPLETE_PROFILE,
                                payload: userInfo
                            });
                            navigate(PATH_PUBLIC.uploadDegree);
                        } else {
                            dispatch({
                                type: IAuthContextActionTypes.SIGNIN,
                                payload: userInfo
                            });
                            navigate(PATH_PUBLIC.home);
                        }
                    } else {
                        dispatch({
                            type: IAuthContextActionTypes.SIGNIN,
                            payload: userInfo
                        });
                        navigate(PATH_PUBLIC.home);
                    }

                }
            } else {
                toast.success(signInResponse.message);
            }
        } catch (error) {
            // @ts-ignore
            toast.success(error.data.message);
            console.log(error)
        }
    }, [])


    // Complete profile method when sign in by google for student
    const completeStudentProfile = useCallback(async (studentProfile: ICompleteStudentProfile) => {
        try {
            const response = await axiosInstance.post<IResponseDTO<string>>(COMPLETE_STUDENT_PROFILE_URL, studentProfile)
            const completeResponse = response.data;
            if (completeResponse.isSuccess === true) {
                toast.success(completeResponse.message);
                dispatch({
                    type: IAuthContextActionTypes.COMPLETE_PROFILE
                });
                navigate(PATH_PUBLIC.home);
            } else {
                toast.error(completeResponse.message);
            }
        } catch (error) {
            // @ts-ignore
            toast.error(error.data.message);
            console.log(error)
        }
    }, []);

    // Complete profile method when sign in by google for instructor
    const completeInstructorProfile = useCallback(async (instructorProfile: ICompleteInstructorProfile) => {
        try {
            const response = await axiosInstance.post<IResponseDTO<string>>(COMPLETE_INSTRUCTOR_PROFILE_URL, instructorProfile)
            const completeResponse = response.data;
            if (completeResponse.isSuccess === true) {
                toast.success(completeResponse.message);
                navigate(PATH_PUBLIC.uploadDegree);
            } else {
                toast.error(completeResponse.message);
            }
        } catch (error) {
            // @ts-ignore
            toast.error(error.data.message);
            console.log(error)
        }
    }, []);

    // Sign up for student
    const signUpStudent = useCallback(async (signUpStudentDTO: ISignUpStudentDTO) => {
        try {
            const response = await axiosInstance.post<ISignUpResponseDTO>(SIGN_UP_STUDENT_URL, signUpStudentDTO);
            const signUpResponse = response.data;

            if (signUpResponse.isSuccess) {
                toast.success(signUpResponse.message);
                const emailToSend = {
                    email: signUpStudentDTO.email
                }
                const response = await axiosInstance.post<IResponseDTO<string>>(SEND_VERIFY_EMAIL_URL, emailToSend);
                const sendResponse = response.data;
                if (sendResponse.isSuccess === true) {
                    toast.success(sendResponse.message);
                }
                navigate(PATH_PUBLIC.signIn);
            } else {
                toast.error(signUpResponse.message);
            }

        } catch (error) {
            // @ts-ignore
            toast.error(error.data.message);
            console.log(error);
        }
    }, [])

    // Sign up for instructor
    const signUpInstructor = useCallback(async (signUpInstructorDTO: ISignUpInstructorDTO) => {
        try {
            const response = await axiosInstance.post<ISignUpResponseDTO>(SIGN_UP_INSTRUCTOR_URL, signUpInstructorDTO);
            const signUpResponse = response.data;

            if (signUpResponse.isSuccess) {
                toast.success(signUpResponse.message);
                const emailToSend = {
                    email: signUpInstructorDTO.email
                }
                const response = await axiosInstance.post<IResponseDTO<string>>(SEND_VERIFY_EMAIL_URL, emailToSend);
                const sendResponse = response.data;
                if (sendResponse.isSuccess === true) {
                    toast.success(sendResponse.message);
                }
                navigate(PATH_PUBLIC.signIn);
            } else {
                toast.error(signUpResponse.message);
            }

        } catch (error) {
            // @ts-ignore
            toast.error(error.data.message);
            console.log(error);
        }
    }, [])

    const uploadDegree = useCallback(async (degreeUploadDTO: IDegreeUploadDTO) => {
        try {
            const response = await axiosInstance.post<IResponseDTO<string>>(UPLOAD_INSTRUCTOR_DEGREE_URL, degreeUploadDTO, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const uploadResponse = response.data;
            if (uploadResponse.isSuccess === true) {
                dispatch({
                    type: IAuthContextActionTypes.COMPLETE_PROFILE,
                })
                toast.success(uploadResponse.message);
            } else {
                toast.error(uploadResponse.message);
            }

        } catch (error) {
            // @ts-ignore
            toast.error(error.data.message)
            console.log(error)
        }
    }, [])


    const signOut = useCallback(async () => {
        setJwtTokenSession(null, null);
        await SignalRService.stopConnection();
        dispatch({
            type: IAuthContextActionTypes.SIGNOUT
        });
        navigate(PATH_PUBLIC.signIn);
    }, [])

    const valuesObject = {

        isAuthenticated: state.isAuthenticated,
        isAuthLoading: state.isAuthLoading,
        isFullInfo: state.isFullInfo,
        user: state.user,

        signInByEmailPassword: signInByEmailPassword,
        signInByGoogle: signInByGoogle,
        completeStudentProfile: completeStudentProfile,
        completeInstructorProfile: completeInstructorProfile,
        signUpInstructor: signUpInstructor,
        signUpStudent: signUpStudent,
        uploadDegree: uploadDegree,
        signOut: signOut,

    };

    return (<AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>)
};

export default AuthContextProvider; 