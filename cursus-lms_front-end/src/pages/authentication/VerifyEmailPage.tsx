import {useEffect, useState} from 'react';
import {IResponseDTO} from "../../types/auth.types.ts";
import axiosInstance from "../../utils/axios/axiosInstance.ts";
import Button from "../../components/general/Button.tsx";
import {useNavigate} from "react-router-dom";
import {PATH_PUBLIC} from "../../routes/paths.ts";
import {VERIFY_EMAIL_URL} from "../../utils/apiUrl/authApiUrl.ts";

const VerifyEmailPage = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const query = new URLSearchParams(window.location.search);
    const userId = query.get('userId');
    const rawToken = query.get('token');
    const token = rawToken ? decodeURIComponent(rawToken) : null;

    useEffect(() => {
        const verifyEmail = async () => {
            if (userId && token) {
                try {
                    const response = await axiosInstance.post<IResponseDTO<string>>(`${VERIFY_EMAIL_URL}?userId=${userId}&token=${encodeURIComponent(token)}`);
                    setMessage(response.data.message);
                } catch (error) {
                    setMessage('Email verification failed. Please try again.');
                } finally {
                    setLoading(false);
                }
            } else {
                setMessage('Invalid verification link.');
                setLoading(false);
            }
        };

        verifyEmail();
    }, [userId, token]);

    return (
        <div className="flex flex-col items-center w-full justify-center">
            <div className="flex flex-col justify-center m-40 bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold mb-2 text-green-800">Email Verification</h1>
                {loading ? (
                    <p className="text-gray-600 mb-10">Loading...</p>
                ) : (
                    <p className="text-gray-600 mb-10">{message}</p>
                )}
                <Button
                    variant='secondary'
                    type='button'
                    label='Sign In'
                    onClick={() => navigate(PATH_PUBLIC.signIn)}
                />
            </div>
        </div>
    );
}

export default VerifyEmailPage;
