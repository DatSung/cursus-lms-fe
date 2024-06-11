import {useEffect, useState} from 'react'
import useAuth from '../../hooks/useAuth.hook';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {ISignInDTO} from '../../types/auth.types';
import InputField from '../../components/general/InputField';
import {Link, useNavigate} from 'react-router-dom';
import Button from '../../components/general/Button';
import {PATH_PUBLIC} from '../../routes/paths';
import toast from 'react-hot-toast';

const SignInPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const {signInByEmailPassword, isAuthenticated} = useAuth();
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

                </form>

            </div>
        </div>
    )
}

export default SignInPage
