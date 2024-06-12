import {useState} from 'react';
import InputField from "../../components/general/InputField.tsx";
import SelectField from "../../components/general/SelectField.tsx";
import Button from "../../components/general/Button.tsx";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {ICompleteStudentProfile, ICompleteInstructorProfile} from "../../types/auth.types.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.hook.ts";

// Placeholder components for Student and Instructor forms
const CompleteProfile = () => {
    const [isStudentForm, setIsStudentForm] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const {completeStudentProfile, completeInstructorProfile} = useAuth();

    const toggleForm = () => {
        setIsStudentForm(!isStudentForm);
    };
    
    const studentFormSchema = Yup.object().shape({
        address: Yup.string().required("Address is required"),
        country: Yup.string().required("Country is required"),
        gender: Yup.string().required("Gender is required"),
        university: Yup.string().required("University is required"),
        birthDate: Yup.date().required("BirthDate is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        cardNumber: Yup.string().required("Card Number is required"),
        cardName: Yup.string().required("Card Name is required"),
        cardProvider: Yup.string().required("Card Provider is required"),
    })

    const instructorFormSchema = Yup.object().shape({
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
        control: studentControl,
        handleSubmit: studentHandleSubmit,
        formState: {errors: studentErrors},
        reset: resetStudentForm,
    } = useForm<ICompleteStudentProfile>({

        resolver: yupResolver(studentFormSchema),

        defaultValues: {
            address: '',
            country: '',
            gender: '',
            university: '',
            birthDate: new Date(),
            phoneNumber: '',
            cardNumber: '',
            cardName: '',
            cardProvider: '',
        }
    });

    const {
        control: instructorControl,
        handleSubmit: instructorHandleSubmit,
        formState: {errors: instructorErrors},
        reset: resetInstructorForm,
    } = useForm<ICompleteInstructorProfile>({

        resolver: yupResolver(instructorFormSchema),

        defaultValues: {
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

    const onSubmitStudentForm = async (data: ICompleteStudentProfile) => {
        try {
            setLoading(true);
            await completeStudentProfile(data);
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

    const onSubmitInstructorForm = async (data: ICompleteInstructorProfile) => {
        try {
            setLoading(true);
            await completeInstructorProfile(data);
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

    const StudentForm = () => (
        <div className="flex min-h-full w-full flex-1 flex-col">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
                    Complete profile as a Student
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    onSubmit={studentHandleSubmit(onSubmitStudentForm)}
                    className="space-y-6"
                    action="#"
                    method="POST"
                >

                    <SelectField
                        control={studentControl}
                        inputName="gender"
                        label="Gender"
                        error={studentErrors.gender?.message}
                        options={[
                            {value: "male", label: "Male"},
                            {value: "female", label: "Female"},
                        ]}
                    />

                    <InputField
                        control={studentControl}
                        label='Country'
                        inputName='country'
                        error={studentErrors.country?.message}
                    />

                    <InputField
                        control={studentControl}
                        label='Address'
                        inputName='address'
                        error={studentErrors.address?.message}
                    />

                    <InputField
                        control={studentControl}
                        label='Phone Number'
                        inputName='phoneNumber'
                        error={studentErrors.phoneNumber?.message}
                    />

                    <InputField
                        control={studentControl}
                        label='Birth Date'
                        inputName='birthDate'
                        inputType='date'
                        error={studentErrors.birthDate?.message}
                    />

                    <InputField
                        control={studentControl}
                        label='University'
                        inputName='university'
                        error={studentErrors.university?.message}
                    />


                    <InputField
                        control={studentControl}
                        label='Card Number'
                        inputName='cardNumber'
                        error={studentErrors.cardNumber?.message}
                    />

                    <InputField
                        control={studentControl}
                        label='Card Name'
                        inputName='cardName'
                        error={studentErrors.cardName?.message}
                    />

                    <InputField
                        control={studentControl}
                        label='Card Provider'
                        inputName='cardProvider'
                        error={studentErrors.cardProvider?.message}
                    />

                    <div className='flex items-center justify-center gap-4 mt-6'>
                        <Button
                            variant='secondary'
                            type='button'
                            label='Reset'
                            onClick={() => resetStudentForm()}
                        />
                        <Button
                            variant='primary'
                            type='submit'
                            label='Update'
                            onClick={() => {
                                // Do nothing
                            }}
                            loading={loading}
                        />
                    </div>

                </form>

            </div>
        </div>
    );

    const InstructorForm = () => (
        <div className="flex min-h-full w-full flex-1 flex-col">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
                    Complete profile as an Instructor
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    onSubmit={instructorHandleSubmit(onSubmitInstructorForm)}
                    className="space-y-6"
                    action="#"
                    method="POST"
                >

                    <InputField
                        control={instructorControl}
                        label='Introduction'
                        inputName='introduction'
                        error={instructorErrors.introduction?.message}
                    />

                    <SelectField
                        control={instructorControl}
                        inputName="gender"
                        label="Gender"
                        error={instructorErrors.gender?.message}
                        options={[
                            {value: "male", label: "Male"},
                            {value: "female", label: "Female"},
                        ]}
                    />

                    <InputField
                        control={instructorControl}
                        label='Country'
                        inputName='country'
                        error={instructorErrors.country?.message}
                    />

                    <InputField
                        control={instructorControl}
                        label='Address'
                        inputName='address'
                        error={instructorErrors.address?.message}
                    />

                    <InputField
                        control={instructorControl}
                        label='Phone Number'
                        inputName='phoneNumber'
                        error={instructorErrors.phoneNumber?.message}
                    />

                    <InputField
                        control={instructorControl}
                        label='Birth Date'
                        inputName='birthDate'
                        inputType='date'
                        error={instructorErrors.birthDate?.message}
                    />

                    <InputField
                        control={instructorControl}
                        label='Degree'
                        inputName='degree'
                        error={instructorErrors.degree?.message}
                    />

                    <InputField
                        control={instructorControl}
                        label='Industry'
                        inputName='industry'
                        error={instructorErrors.industry?.message}
                    />

                    <InputField
                        control={instructorControl}
                        label='Tax Number'
                        inputName='taxNumber'
                        error={instructorErrors.taxNumber?.message}
                    />

                    <InputField
                        control={instructorControl}
                        label='Card Number'
                        inputName='cardNumber'
                        error={instructorErrors.cardNumber?.message}
                    />


                    <InputField
                        control={instructorControl}
                        label='Card Name'
                        inputName='cardName'
                        error={instructorErrors.cardName?.message}
                    />

                    <InputField
                        control={instructorControl}
                        label='Card Provider'
                        inputName='cardProvider'
                        error={instructorErrors.cardProvider?.message}
                    />

                    <div className='flex items-center justify-center gap-4 mt-6'>
                        <Button
                            variant='secondary'
                            type='button'
                            label='Reset'
                            onClick={() => resetInstructorForm()}
                        />
                        <Button
                            variant='primary'
                            type='submit'
                            label='Update'
                            onClick={() => {
                                // Do nothing
                            }}
                            loading={loading}
                        />
                    </div>

                </form>

            </div>
        </div>
    );

    return (
        <div className="max-w-md w-8/12 mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-center mb-6">
                <button
                    onClick={toggleForm}
                    className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
                >
                    {isStudentForm ? 'Switch to Instructor Form' : 'Switch to Student Form'}
                </button>
            </div>
            {isStudentForm ? <StudentForm/> : <InstructorForm/>}
        </div>
    );
};

export default CompleteProfile;
