import {useEffect, useState} from 'react';
import {IResponseDTO} from "../../types/auth.types.ts";
import axiosInstance from "../../utils/axiosInstance.ts";

const VerifyEmailPage = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const query = new URLSearchParams(window.location.search);
    const userId = query.get('userId');
    const rawToken = query.get('token');
    const token = rawToken ? decodeURIComponent(rawToken) : null;

    useEffect(() => {
        const verifyEmail = async () => {
            if (userId && token) {
                try {
                    const response = await axiosInstance.post<IResponseDTO<string>>(`https://localhost:7554/api/Auth/verify-email?userId=${userId}&token=${encodeURIComponent(token)}`);
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
        <div>
            <h1>Email Verification</h1>
            {loading ? <p>Loading...</p> : <p>{message}</p>}
        </div>
    );
}

export default VerifyEmailPage;
