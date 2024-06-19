import InputField from "../../components/general/InputField.tsx";
import {Link, useNavigate} from "react-router-dom";
import {PATH_PUBLIC} from "../../routes/paths.ts";
import Button from "../../components/general/Button.tsx";
import {useEffect, useState} from "react";
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth.hook.ts";
import toast from "react-hot-toast";
import {ISignUpInstructorDTO} from "../../types/auth.types.ts";
import SelectField from "../../components/general/SelectField.tsx";

const SignUpStudentPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const {signUpInstructor, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(PATH_PUBLIC.home);
        }
    });


    const signUpSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
        confirmPassword: Yup.string().required("Confirm Password is required")
            .oneOf([Yup.ref('password')], 'Confirm Password must match'),
        fullName: Yup.string().required("Full Name is required"),
        address: Yup.string().required("Address is required"),
        country: Yup.string().required("Country is required"),
        gender: Yup.string().required("Gender is required"),
        degree: Yup.string().required("University is required"),
        industry: Yup.string().required("University is required"),
        introduction: Yup.string().required("University is required"),
        taxNumber: Yup.string().required("University is required"),
        birthDate: Yup.date().required("BirthDate is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        cardNumber: Yup.string().required("Card Number is required"),
        cardName: Yup.string().required("Card Name is required"),
        cardProvider: Yup.string().required("Card Provider is required"),
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<ISignUpInstructorDTO>({

        resolver: yupResolver(signUpSchema),

        defaultValues: {
            email: '',
            address: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            country: '',
            gender: '',
            degree: '',
            industry: '',
            introduction: '',
            taxNumber: '',
            birthDate: new Date(),
            phoneNumber: '',
            cardNumber: '',
            cardName: '',
            cardProvider: '',
        }
    });

    const onSubmitSignUpForm = async (data: ISignUpInstructorDTO) => {
        try {
            setLoading(true);
            await signUpInstructor(data);
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
                    Sign up as Instructor
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    onSubmit={handleSubmit(onSubmitSignUpForm)}
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

                    <InputField
                        control={control}
                        label='Confirm Password'
                        inputName='confirmPassword'
                        inputType='password'
                        error={errors.confirmPassword?.message}
                    />

                    <InputField
                        control={control}
                        label='Full Name'
                        inputName='fullName'
                        error={errors.fullName?.message}
                    />

                    <InputField
                        control={control}
                        label='Introduction'
                        inputName='introduction'
                        error={errors.introduction?.message}
                    />

                    <SelectField
                        control={control}
                        inputName="gender"
                        label="Gender"
                        error={errors.gender?.message}
                        options={[
                            {value: "male", label: "Male"},
                            {value: "female", label: "Female"},
                        ]}
                    />

                    <InputField
                        control={control}
                        label='Country'
                        inputName='country'
                        error={errors.country?.message}
                    />

                    <InputField
                        control={control}
                        label='Address'
                        inputName='address'
                        error={errors.address?.message}
                    />

                    <InputField
                        control={control}
                        label='Phone Number'
                        inputName='phoneNumber'
                        error={errors.phoneNumber?.message}
                    />

                    <InputField
                        control={control}
                        label='Birth Date'
                        inputName='birthDate'
                        inputType='date'
                        error={errors.birthDate?.message}
                    />

                    <InputField
                        control={control}
                        label='Degree'
                        inputName='degree'
                        error={errors.degree?.message}
                    />

                    <InputField
                        control={control}
                        label='Industry'
                        inputName='industry'
                        error={errors.industry?.message}
                    />

                    <InputField
                        control={control}
                        label='Tax Number'
                        inputName='taxNumber'
                        error={errors.taxNumber?.message}
                    />

                    <InputField
                        control={control}
                        label='Card Number'
                        inputName='cardNumber'
                        error={errors.cardNumber?.message}
                    />


                    <InputField
                        control={control}
                        label='Card Name'
                        inputName='cardName'
                        error={errors.cardName?.message}
                    />

                    <InputField
                        control={control}
                        label='Card Provider'
                        inputName='cardProvider'
                        error={errors.cardProvider?.message}
                    />

                    <div className='flex justify-evenly items-center'>
                        <Link
                            to={PATH_PUBLIC.signIn}
                            className='text-green-800 hover:text-green-600 px-3'
                        >
                            Already have an account?
                        </Link>
                        <Link
                            to={PATH_PUBLIC.signUpStudent}
                            className='text-green-800 border border-[754eb4] hover:text-green-600 px-3 rounded-2xl duration-200'
                        >
                            Sign up as Student
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
                            label='Sign Up'
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

export default SignUpStudentPage
