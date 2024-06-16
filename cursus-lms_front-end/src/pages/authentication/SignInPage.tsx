import {useEffect, useState} from 'react'
import useAuth from '../../hooks/useAuth.hook.ts';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {ISignInByGoogleDTO, ISignInDTO} from '../../types/auth.types.ts';
import InputField from '../../components/general/InputField.tsx';
import {Link, useNavigate} from 'react-router-dom';
import Button from '../../components/general/Button.tsx';
import {PATH_PUBLIC} from '../../routes/paths.ts';
import toast from 'react-hot-toast';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import auth from '../../firebase/firebaseConfig.ts';

const SignInPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const {signInByEmailPassword, signInByGoogle, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(PATH_PUBLIC.home);
        }
    });

    const signinSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required").email("Email must be a valid email"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    });

    const {

        control,
        handleSubmit,
        formState: {errors},
        reset,

    } = useForm<ISignInDTO>({

        resolver: yupResolver(signinSchema),

        defaultValues: {
            email: '',
            password: ''
        }

    })

    const handleGoogle = async () => {
        try {
            const provider = await new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const idTokenResult = await result.user?.getIdTokenResult();
            const signInByGoogleDto: ISignInByGoogleDTO = {
                Token: idTokenResult.token
            }
            await signInByGoogle(signInByGoogleDto);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmitLoginForm = async (data: ISignInDTO) => {
        try {
            setLoading(true);
            await signInByEmailPassword(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const err = error as { data: string; status: number }
            const {status} = err;

            if (status === 401) {
                toast.error('Invalid username or password');
            } else {
                toast.error('An error occurred. Please contact admins');
            }

        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    onSubmit={handleSubmit(onSubmitLoginForm)}
                    className="space-y-6"
                    action="#"
                    method="POST"
                >

                    <InputField
                        control={control}
                        label='Email'
                        inputName='email'
                        error={errors.email?.message}
                    />

                    <InputField
                        control={control}
                        label='Password'
                        inputName='password'
                        inputType='password'
                        error={errors.password?.message}
                    />

                    <div className='flex justify-evenly items-center'>
                        <Link
                            to={PATH_PUBLIC.forgotPassword}
                            className='text-green-800 hover:text-green-600 px-3'
                        >
                            Forgot password?
                        </Link>
                        <Link
                            to={PATH_PUBLIC.signUpStudent}
                            className='text-green-800 border border-[754eb4] hover:text-green-600 px-3 rounded-2xl duration-200'
                        >
                            Create an account
                        </Link>
                    </div>

                    <div className='flex items-center justify-center gap-4 mt-6'>
                        <Button
                            variant='secondary'
                            type='button'
                            label='Reset'
                            onClick={() => reset()}
                        />
                        <Button
                            variant='primary'
                            type='submit'
                            label='Sign In'
                            onClick={() => {
                                // Do nothing
                            }}
                            loading={loading}
                        />
                    </div>

                    <hr></hr>

                    <div className="mx-auto px-6 sm:px-0 max-w-sm">
                        <button
                            onClick={handleGoogle}
                            type="button"
                            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between">
                            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab"
                                 data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor"
                                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Sign in with Google
                            <div></div>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignInPage
