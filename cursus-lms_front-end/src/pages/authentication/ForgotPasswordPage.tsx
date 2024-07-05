import {useState} from "react";
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {IForgotPasswordDTO, IResponseDTO} from "../../types/auth.types.ts";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios/axiosInstance.ts";
import {FORGOT_PASSWORD_URL} from "../../utils/apiUrl/authApiUrl.ts";
import InputField from "../../components/general/InputField.tsx";
import Button from "../../components/general/Button.tsx";
import {useNavigate} from "react-router-dom";
import {PATH_PUBLIC} from "../../routes/paths.ts";

const ForgotPasswordPage = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const forgotPasswordSchema = Yup.object().shape({
        emailOrPhone: Yup.string().required("Email or Phone is required"),
    });

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<IForgotPasswordDTO>({

        resolver: yupResolver(forgotPasswordSchema),

        defaultValues: {
            emailOrPhone: ''
        }
    });

    const onSubmitForgotPasswordForm = async (data: IForgotPasswordDTO) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post<IResponseDTO<string>>(FORGOT_PASSWORD_URL, data);
            const forgotResponse = response.data;

            if (forgotResponse.statusCode === 500) {
                throw new Error(forgotResponse.message);
            }

            if (forgotResponse.isSuccess === true) {
                toast.success(forgotResponse.message);
            }
            setLoading(false);
        } catch (error) {
            // @ts-ignore
            toast.error(error.data.message)
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
                    Send an email to reset password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    onSubmit={handleSubmit(onSubmitForgotPasswordForm)}
                    className="space-y-6"
                    action="#"
                    method="POST"
                >
                    <InputField
                        control={control}
                        label='Email Or Phone'
                        inputName='emailOrPhone'
                        error={errors.emailOrPhone?.message}
                    />

                    <div className='flex items-center justify-center gap-4 mt-6'>
                        <Button
                            variant='secondary'
                            type='button'
                            label='Back'
                            onClick={() => navigate(PATH_PUBLIC.signIn)}
                        />
                        <Button
                            variant='secondary'
                            type='button'
                            label='Reset'
                            onClick={() => reset()}
                        />
                        <Button
                            variant='primary'
                            type='submit'
                            label='Send'
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
};

export default ForgotPasswordPage;