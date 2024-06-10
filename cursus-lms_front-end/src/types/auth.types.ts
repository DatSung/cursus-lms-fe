// Represent to SignDTO of back-end 
export interface ISignInDTO {
    email: string;
    password: string;
}

export interface ISignInByGooleStudentDTO {
    token: string;
}
export interface ISignInByGooleInstructorDTO {
    token: string;
}

// Represent to InstructorDTO of back-end 
export interface ISignUpInstructorDTO {
    password: string;
    email: string,
    phoneNumber: string;
    gender: string;
    fullName: string;
    birthDate: string;
    country: string;
    address: string;
    degree: string;
    industry: string;
    introduction: string;
    taxNumber: string;
    cardNumber: string;
    cardName: string;
    cardProvider: string;
}

// Represent to RegisterStudentDTO of back-end 
export interface ISignUpStudentDTO {
    email: string,
    password: string;
    confirmPassword: string;
    fullName: string;
    address: string;
    country: string;
    gender: string;
    university: string;
    birthDate: string;
    phoneNumber: string;
    cardNumber: string;
    cardName: string;
    cardProvider: string;
}

// Represent to UserInfo of back-end
export interface IUserInfo {
    id: string;
    userName: string,
    fullName: string;
    gender: string;
    birthDate: string;
    email: string;
    country: string;
    phoneNumber: string;
    address: string;
    updateTime: string;
    roles: string[]
}

// Represent to SignResponseDTO of back-end
export interface ISignInResponseDTO {
    result: {
        accessToken: string;
        refreshToken: string;
        userInfo: IUserInfo;
        message: string;
    }
    isSuccess: true,
    statusCode: number,
    message: string;
}

// Represent to AvatarUploadDTO of back-end
export interface IAvatarUploadDTO {
    avatarFile: File;
}

// Represent to DegreeUploadDTO of back-end
export interface IDegreeUploadDTO {
    degreeFile: File;
}

// Represent to ChangePasswordDTO of back-end
export interface IChangePasswordDTO {
    userId: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface IForgotPasswordDTO {
    emailOrPhone: string;
}

export interface IJwtTokenDTO {
    result: {
        accessToken: string;
        refreshToken: string;
    }
    isSuccess: boolean,
    statusCode: number,
    message: string
}

export interface IResetPasswordDTO {
    email: string;
    token: string;
    password: string;
}

export interface IUpdateStudentProfile {
    country: string;
    phoneNumber: string;
    address: string;
    birthDate: string;
    gender: string;
    university: string;
    cardNumber: string;
    cardProvider: string;
    cardName: string;
}

export interface IUpdateInstructorProfile {
    phoneNumber: string;
    gender: string;
    birthDate: string;
    country: string;
    address: string;
    taxNumber: string;
    cardNumber: string;
    cardProvider: string;
    cardName: string;
    industry: string;
    introduction: string;
}

export interface ISendVerifyEmailDTO {
    email: string;
}

export interface IVerifyEmailDTO {
    userId: string;
    token: string;
}

export interface IEmailDTO {
    email: string;
}

export interface IPhoneNumberDTO {
    phoneNumber: string;
}

export interface ISignUpResponseDTO {
    result: string,
    isSuccess: boolean,
    statusCode: number,
    message: string
}

// Auth Context Interfaces

export interface IAuthContextState {
    isAuthenticated: boolean;
    isFullInfo: boolean;
    isAuthLoading: boolean;
    user?: IUserInfo;
}

export enum IAuthContextActionTypes {
    INITIAL = 'INITIAL',
    SIGNIN = 'SIGNIN',
    SIGNINBYGOOGLE = 'SIGNINBYGOOGLE',
    SIGNOUT = 'SIGNOUT',
}

export interface IAuthContextAction {
    type: IAuthContextActionTypes;
    payload?: IUserInfo;
}

export interface IAuthContext {
    isAuthenticated: boolean;
    isFullInfo: boolean;
    isAuthLoading: boolean;
    user?: IUserInfo;

    signInByEmailPassword: (signInField: ISignInDTO) => Promise<void>;

    signInByGoogleStudent: (signInField: ISignInByGooleStudentDTO) => Promise<void>;

    signInByGoogleInstructor: (signInField: ISignInByGooleInstructorDTO) => Promise<void>;

    signUpStudent: (signUpField: ISignUpStudentDTO) => Promise<void>;

    signUpInstructor: (signUpField: ISignUpInstructorDTO) => Promise<void>;

    logout: () => void;

    // refresh: (refreshToken: string) => Promise<void>;

    // uploadUserAvatar: (uploadFile: IAvatarUploadDTO) => Promise<void>;

    // getUserAvatar: (uploadFile: IAvatarUploadDTO) => Promise<void>;

    // uploadInstructorDegree: (uploadFile: IDegreeUploadDTO) => Promise<void>;

    // getInstructorDegree: (uploadFile: IDegreeUploadDTO) => Promise<void>;

    // updateStudentProfile: (updateField: IUpdateStudentProfile) => Promise<void>;

    // updateInstructorProfile: (updateField: IUpdateInstructorProfile) => Promise<void>;

    // forgotPassword: (forgotField: IForgotPasswordDTO) => Promise<void>;

    // resetPassword: (resetField: IResetPasswordDTO) => Promise<void>;

    // changePassword: (changeField: IChangePasswordDTO) => Promise<void>;

    // sendVerifyEmail: (sendField: ISendVerifyEmailDTO) => Promise<void>;

    // verifyEmail: (verifyField: IVerifyEmailDTO) => Promise<void>;

    // checkEmailExist: (checkField: IEmailDTO) => Promise<void>;

    // checkPhoneNumberExist: (checkField: IPhoneNumberDTO) => Promise<void>;

}

export enum RolesEnum {
    STUDENT = 'STUDENT',
    INSTRUCTOR = 'INSTRUCTOR',
    ADMIN = 'ADMIN'
}